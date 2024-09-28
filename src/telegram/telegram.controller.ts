import {TelegramService} from './telegram.service';
import {Ctx, InjectBot, On, Update, Command, Message} from "nestjs-telegraf";
import {Context, Markup, Telegraf} from "telegraf";
import {ConfigService} from "@nestjs/config";
import {OrdersService} from "../orders/orders.service";
import prepareMessageTemplate from "../__features/prepareMessageTemplate";


@Update()
export class TelegramController {
  private allowedUsers: Set<number> = new Set(); // Зберігаємо множину дозволених користувачів
  private readonly PASSWORD: string;

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

    await ctx.reply(`Статус замовлення №${orderId} змінено на "Виконаний".`)
    return
  }


  @Command("users")
  async setup(@Ctx() ctx: Context, @Message("text") msg: string) {
    if (!this.telegramService.checkUser(this.allowedUsers, ctx.from.id)) {
      await ctx.reply("Ви не авторизовані у цю систему.")
      return
    }

    return JSON.stringify(await this.telegramService.setup())
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

    if (isNaN(orderId)) {
      return await ctx.reply(`Некоректний ID замовлення.`)
    }

    const order = await this.telegramService.getOneOrder(orderId)

    if (!order) {
      await ctx.reply(`Замовлення з ідентифікатором ${orderId} не існує.`)
      return
    }

    await ctx.reply(prepareMessageTemplate(order, orderId))
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


    const styledOrdersText = orders.map((order, index) => prepareMessageTemplate(order, ++index)).join("\n")

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