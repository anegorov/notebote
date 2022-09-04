import axios from "axios";
import { Context } from "telegraf";
import { Ls } from "../commands/Ls";
import { Mkdir } from "../commands/Mkdir";
import { Help } from "../commands/Help";
import Saver from "../service/Saver";
import { Keywords } from "./Keywords";
import Parser from "./Parser";
import { NewNote } from "../commands/NewNote";

export default class Processor {
    storage: Saver = new Saver();
    
    async text(ctx: Context) {
        const update: any = ctx.update;
        const current:string = update.message.text;
        const parser: Parser = new Parser(current);
        if(parser.isValidCommand()){
            if(current.includes(Keywords.HELP)){
                const result: string = await new Help(current).execute();
                ctx.reply(result);
            }
            if(current.includes(Keywords.LIST)){
                const result: string = await new Ls(current).execute();
                ctx.reply(result);
            }
            if(current.includes(Keywords.MKDIR)){
                await new Mkdir(current).execute();
                ctx.reply(` >>> ${current}`);
            }
            if(current.includes(Keywords.NEW)){
                const result: string = await new NewNote(current).execute();
                ctx.reply(`${result}`);
            }
        }else{
            console.log('Cant recognize this command');
            ctx.reply('Cant recognize this command');
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