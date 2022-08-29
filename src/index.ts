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
    const msg: any = ctx.message;
    const file_id: string = msg.document.file_id;
    const href: string = await (await ctx.telegram.getFileLink(file_id)).href;
    const response: any = await axios.get(href, {responseType: 'arraybuffer'});
    const buffer = Buffer.from(response.data, 'base64');
    await storage.uploadFile(buffer);
    ctx.reply(href);
});

bot.launch();
