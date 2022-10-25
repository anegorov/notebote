import { Telegraf, session, Context, Scenes } from 'telegraf';
import Processor from './flows/Processor';
import { NewScene } from './scenes/NewScene';
import { BotContext } from './types/Types';

const config = require('config');
const bot = new Telegraf<BotContext>(config.get("token"));
const processor: Processor = new Processor();
const stage = new Scenes.Stage([NewScene.execute() as any], {ttl: 10});

bot.use(session());
bot.use(stage.middleware() as any);

// bot.command('hi', (ctx:any) => ctx.scene.enter('NEW_NOTE'))

bot.on('text', (ctx: Context) => {
    processor.text(ctx);    
});

bot.on('message', async (ctx: Context) => {
    processor.message(ctx);
});

bot.launch();
