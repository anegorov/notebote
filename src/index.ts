import { Telegraf } from 'telegraf';
import Processor from './flows/Processor';
import TextFlow from './flows/Processor';

let token: string = "1727260134:AAHJ1o2D0vnV3MH6ZlVWQnHxgpdiUYjvZmE";

const bot = new Telegraf(token);
const processor: Processor = new Processor();

bot.on('text', (ctx) => {
    processor.text(ctx);    
});

bot.launch();
