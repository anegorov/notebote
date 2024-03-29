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
            const command = new Command(ctx);
            NewScene.textNote = command.getCurrentText();
            console.log(`PATH >> ${command.getPath()}`);
            const result: YResponse = await storage.uploadBuffer(NewScene.fileName, NewScene.textNote, command.getPath());
            await ctx.reply(`${NewScene.textNote}\n\tsaved to ${NewScene.fileName}`);
            return await ctx.scene.leave();
        }
        );
    }
}