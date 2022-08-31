import { Telegraf } from 'telegraf';
import { Context } from 'telegraf';
import Processor from './flows/Processor';

let token: string = "1727260134:AAHJ1o2D0vnV3MH6ZlVWQnHxgpdiUYjvZmE";

const bot = new Telegraf(token);
const processor: Processor = new Processor();

bot.on('text', (ctx: Context) => {
    processor.text(ctx);    
});

bot.on('message', async (ctx) => {
    processor.message(ctx);
});

bot.launch();
