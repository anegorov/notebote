import { Telegraf } from 'telegraf';
import { Context } from 'telegraf';
import Processor from './flows/Processor';

const config = require('config');
const bot = new Telegraf(config.get("token"));
const processor: Processor = new Processor();

bot.on('text', (ctx: Context) => {
    processor.text(ctx);    
});

bot.on('message', async (ctx) => {
    processor.message(ctx);
});

bot.launch();
