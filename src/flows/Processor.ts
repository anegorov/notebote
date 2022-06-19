import { Ls } from "../commands/Ls";
import Saver from "../service/Saver";
import { Keywords } from "./Keywords";
import Parser from "./Parser";

export default class Processor {
    storage: Saver = new Saver();
    
    async text(ctx:any) {
        const current:string = ctx.update.message.text;
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
}