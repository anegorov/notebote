import axios from "axios";
import { Context } from "telegraf";
import Saver from "../service/Saver";
import Parser from "./Parser";
import { CommandFactory, Keys } from "../commands/CommandFactory";

export default class Processor {
    storage: Saver = new Saver();
    
    async text(ctx: Context) {
        const update: any = ctx.update;
        const current:string = update.message.text;
        const parser: Parser = new Parser(current);
        if(parser.isValidCommand()){
            const result: string = await new CommandFactory(current).getCommand(parser.getCommandName() as Keys).execute();
            ctx.reply(result);
        }
    }

    async message(ctx: Context) {
        const msg: any = ctx.message;
        const file_id: string = msg.document.file_id;
        const href: string = await (await ctx.telegram.getFileLink(file_id)).href;
        const response: any = await axios.get(href, {responseType: 'arraybuffer'});
        const buffer = Buffer.from(response.data, 'base64');
        await this.storage.uploadFileFromBuffer(buffer);
        ctx.reply(href);
    }
}