import { Keywords } from "../flows/Keywords";
import { Command } from "./Command";
import { Delete } from "./Delete";
import { Help } from "./Help";
import { Ls } from "./Ls";
import { Mkdir } from "./Mkdir";
import { NewNote } from "./NewNote";
import { Error } from "./Error";
import { Context } from "telegraf";
import { Cat } from "./Cat";

const commandsMap = {
    del: Delete,
    help: Help,
    ls: Ls,
    mkdir: Mkdir,
    new: NewNote,
    cat: Cat
};

export type Keys = keyof typeof commandsMap;
  
export class CommandFactory {
    ctx: Context;
    
    constructor(ctx: Context) {
        this.ctx = ctx;
    }

    getCommand(k: Keys): Command {
        switch(k) {
            case Keywords.HELP:
                return new Help(this.ctx);
            case Keywords.LIST:
                return new Ls(this.ctx);
            case Keywords.MKDIR:
                return new Mkdir(this.ctx);
            case Keywords.NEW:
                return new NewNote(this.ctx);
            case Keywords.CAT:
                    return new Cat(this.ctx);
            case Keywords.DELETE:
                return new Delete(this.ctx);
            default:
                return new Error(this.ctx);
        }
    }
}