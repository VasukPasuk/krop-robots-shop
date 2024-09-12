import {TelegramService} from './telegram.service';
import {Ctx, InjectBot, On, Update} from "nestjs-telegraf";
import {Context, Telegraf} from "telegraf";

@Update()
export class TelegramController {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly telegramService: TelegramService
  ) {

  }

  @On("message")
  async onMessage(@Ctx() ctx: Context) {
    const productList = (await this.telegramService.getProducts())
      .map(product => product.name)
      .join('\n');

    await ctx.reply(productList);
  }
}
