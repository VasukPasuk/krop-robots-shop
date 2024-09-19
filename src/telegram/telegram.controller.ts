import {TelegramService} from './telegram.service';
import {Ctx, InjectBot, On, Update, Command, Message} from "nestjs-telegraf";
import {Context, Markup, Telegraf} from "telegraf";
import {ConfigService} from "@nestjs/config";
import {OrdersService} from "../orders/orders.service";
import getNormalDate from "../__features/getNormalDate";
import {Order, OrderItem, Variant} from "@prisma/client";

@Update()
export class TelegramController {
  private allowedUsers: Set<number> = new Set(); // Зберігаємо множину дозволених користувачів
  private PASSWORD: string;

  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly telegramService: TelegramService,
    private readonly configService: ConfigService,
    private readonly orderService: OrdersService
  ) {
    this.PASSWORD = this.configService.get<string>("SECRET_TELEGRAM_ACCESS_PASSWORD");
  }

  @Command("start")
  async startHandler(@Ctx() ctx: Context) {
    const userId = ctx.from?.id;
    if (userId && this.allowedUsers.has(userId)) {
      await ctx.reply('Ви вже авторизовані!');
      await this.showCommands(ctx);
    } else {
      await ctx.reply('Введіть пароль для доступу до бота:');
    }
  }

  @Command('logout')
  async logout(ctx: Context) {
    const userId = ctx.from?.id;
    if (userId) {
      this.allowedUsers.delete(userId);
      await ctx.reply('Ви вийшли з системи. Для повторного входу введіть /start');
    }
  }

  @Command("help")
  async banana(@Ctx() ctx: Context) {
    if (!this.telegramService.checkUser(this.allowedUsers, ctx.from.id)) {
      await ctx.reply("Ви не авторизовані у цю систему.")
    } else {
      await ctx.reply(
        'Доступні команди:\n' +
        '/categories - показати список продуктів\n' +
        '/help - показати це повідомлення\n' +
        '/logout - вийти з системи\n' +
        '/all_orders - всі замовлення\n' +
        '/order [номер ID] - інформація про певне замовлення\n' +
        '/fulfill [номер ID] - показати список усіх замовлень' +
        '/today_order - показати список усіх замовлень'
      );
    }
  }

  @Command("fulfill")
  async fulfillOrder(@Ctx() ctx: Context, @Message("text") msg: string) {
    if (!this.telegramService.checkUser(this.allowedUsers, ctx.from.id)) {
      await ctx.reply("Ви не авторизовані у цю систему.")
      return
    }
    if (msg.split(" ").length !== 2) {
      await ctx.reply("Команда fulfill повинна містити ID замовлення.")
      return
    }

    const orderId = parseInt(msg.split(" ")[1]);

    if (isNaN(orderId)) {
      await ctx.reply("ID замовлення повинно містити числове значення.")
      return
    }

    await this.telegramService.fulfillOrder(orderId)
  }

  @Command("order")
  async getOneOrderHandler(@Ctx() ctx: Context, @Message("text") msg: string) {
    if (!this.telegramService.checkUser(this.allowedUsers, ctx.from.id)) {
      await ctx.reply("Ви не авторизовані у цю систему.")
      return
    }
    if (msg.split(" ").length !== 2) {
      await ctx.reply("Некоректна команда. Вигляд: /order 1")
      return
    }
    const orderId = parseInt(msg.split(" ")[1]);

    const order = await this.telegramService.getOneOrder(orderId)

    if (!order) {
      await ctx.reply(`Замовлення з ідентифікатором ${orderId} не існує.`)
      return
    }

    await ctx.reply(this.orderInformation(order))
  }

  @Command("all_orders")
  async getAllOrders(@Ctx() ctx: Context) {
    if (!this.telegramService.checkUser(this.allowedUsers, ctx.from.id)) {
      await ctx.reply("Ви не авторизовані у цю систему.")
      return
    }

    const orders = await this.orderService.getMany()

    if (!orders) {
      await ctx.reply(`Замовлень не має.`)
      return
    }


    const styledOrdersText = orders.map((order, index) => this.orderInformation(order, index)).join("\n")

    await ctx.reply(styledOrdersText)
  }

  async showCommands(ctx: Context) {
    await ctx.reply(
      'Оберіть команду:',
      Markup.keyboard([['/week_orders', '/all_orders', '/today_orders', '/fulfill', "/order"], ['/logout', '/help']])
        .resize()

        .oneTime()
    );
  }

  orderInformation(order: Order & Partial<{items: Array<OrderItem & any> }>, index?: number) {
    return `\n---------------------- Замовлення ${index ? "#" + (++index) : ""} ----------------------\n` + (
      `ID: ${order.id}\n` +
      `ПІБ: ${order.first_surname} ${order.name} ${order.second_surname} \n` +
      `Кількість товарів до замовлення: ${order.total_items} шт. \n` +
      `Ціна замовлення: ${order.total_price} грн. \n` +
      `Номер телефону: ${order.phone_number} \n` +
      `E-mail: ${order.email} \n` +
      `Тип платежу: ${order.payment_type}\n` +
      `Дата створення: ${getNormalDate(order.created_at.toString())}\n`
    ) + (
      "\n----------------------------- Товари -----------------------------\n"
    ) + (!!order.items && (
      order.items.map((item) => (
        `ID: ${item.id} \n` +
        `Продукт: ${item.product_name} \n` +
        `Кількість: ${item.amount} \n` +
        `Ціна: ${item.price} \n` +
        `Колір: ${item.color_name} \n` +
        `Варіант: ${item.variant.size_label} \n` +
        `Пластик: ${item.plastic} \n`
      )).join("\n")
    ))
  }

  @On("message")
  async onMessage(@Ctx() ctx: Context) {
    const userId = ctx.from?.id;
    if (!userId) {
      await ctx.reply('Помилка: не вдалося визначити ID користувача.');
      return;
    }

    if (ctx.message && 'text' in ctx.message) {
      const messageText = ctx.message.text;

      if (!this.allowedUsers.has(userId)) {
        if (messageText === this.PASSWORD) {
          this.allowedUsers.add(userId);
          await ctx.reply('Пароль правильний. Ви авторизовані.');
          await this.showCommands(ctx);
        } else {
          await ctx.reply('Неправильний пароль. Спробуйте ще раз.');
        }
      }
    }
  }
}