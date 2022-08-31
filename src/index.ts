import axios from 'axios';
import { Telegraf } from 'telegraf';
import { Context } from 'telegraf';
import Processor from './flows/Processor';
import Saver from './service/Saver';

let token: string = "1727260134:AAHJ1o2D0vnV3MH6ZlVWQnHxgpdiUYjvZmE";

const bot = new Telegraf(token);
const processor: Processor = new Processor();
const storage: Saver = new Saver();

bot.on('text', (ctx: Context) => {
    processor.text(ctx);    
});

bot.on('message', async (ctx) => {
    processor.message(ctx);
});

bot.launch();
