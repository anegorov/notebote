import { Scenes } from "telegraf";
export class NewScene {
    static execute() {
    return new Scenes.WizardScene('NEW_NOTE',
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