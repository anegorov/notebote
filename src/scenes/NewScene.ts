import { Context, Scenes } from "telegraf";

export class NewScene {
    execute() {
    return new Scenes.WizardScene('new-note',
        async (ctx) => {
            await ctx.reply('Set note name')
            return ctx.wizard.next()
        },
        async (ctx) => {
            await ctx.reply('Set note')
            return ctx.wizard.next()
        },
        async (ctx) => {
            await ctx.reply('Saved')
            return await ctx.scene.leave()
        }
        );
    }
}