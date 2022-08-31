import axios from "axios";
import { Context } from "telegraf";
import { Ls } from "../commands/Ls";
import Saver from "../service/Saver";
import { Keywords } from "./Keywords";
import Parser from "./Parser";

export default class Processor {
    storage: Saver = new Saver();
    
    async text(ctx: Context) {
        const update: any = ctx.update;
        const current:string = update.message.text;
        const parser: Parser = new Parser(current);
        if(parser.isValidCommand()){
            if(current.includes(Keywords.HELP)){
                ctx.reply('Please read README again.');
            }
            if(current.includes(Keywords.LIST)){
                const result: string = await new Ls(current).execute();
                ctx.reply(result);
            }
        }else{
            console.log('Not valid string');
        }
    }

    async message(ctx: Context) {
        const msg: any = ctx.message;
        const file_id: string = msg.document.file_id;
        const href: string = await (await ctx.telegram.getFileLink(file_id)).href;
        const response: any = await axios.get(href, {responseType: 'arraybuffer'});
        const buffer = Buffer.from(response.data, 'base64');
        await this.storage.uploadFile(buffer);
        ctx.reply(href);
    }
}