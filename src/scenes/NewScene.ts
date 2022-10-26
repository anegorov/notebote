import { Scenes } from "telegraf";
import { Command } from "../commands/Command";
import Saver from "../service/Saver";
import { YResponse } from "../types/Types";
export class NewScene {
    static fileName: string;
    static textNote: string;
    static execute() {
    return new Scenes.WizardScene('NEW_NOTE',
        async (ctx) => {
            NewScene.fileName = new Command(ctx).getTail();
            await ctx.reply(`Put content to ${NewScene.fileName}`);
            return ctx.wizard.next();
        },
        async (ctx) => {
            const storage: Saver = new Saver();
            NewScene.textNote = new Command(ctx).getCurrentText();
            const result: YResponse = await storage.uploadBuffer(NewScene.fileName, NewScene.textNote);
            if(result.Key.includes(NewScene.fileName)){
                await ctx.reply(`Note ${NewScene.fileName} with content "${NewScene.textNote}" is saved`);
            } else {
                await ctx.reply(`Can't save ${NewScene.fileName}`);
            }
            return await ctx.scene.leave();
        }
        );
    }
}