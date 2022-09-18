import { Telegraf, session, Context } from 'telegraf';
import Processor from './flows/Processor';
import { BotContext } from './types/Types';

const config = require('config');
const bot = new Telegraf<BotContext>(config.get("token"));
const processor: Processor = new Processor();
bot.use(session());

bot.on('text', (ctx: Context) => {
    processor.text(ctx);    
});

bot.on('message', async (ctx) => {
    processor.message(ctx);
});

bot.launch();
