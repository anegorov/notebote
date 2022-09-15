import { Keywords } from "../flows/Keywords";
import { Command } from "./Command";
import { Delete } from "./Delete";
import { Help } from "./Help";
import { Ls } from "./Ls";
import { Mkdir } from "./Mkdir";
import { NewNote } from "./NewNote";
import { Error } from "./Error";

const commandsMap = {
    del: Delete,
    help: Help,
    ls: Ls,
    mkdir: Mkdir,
    new: NewNote
};

export type Keys = keyof typeof commandsMap;
  
export class CommandFactory {
    input: string;
    
    constructor(input: string) {
        this.input = input;
    }

    getCommand(k: Keys): Command {
        switch(k) {
            case Keywords.HELP:
                return new Help(this.input);
            case Keywords.LIST:
                return new Ls(this.input);
            case Keywords.MKDIR:
                return new Mkdir(this.input);
            case Keywords.NEW:
                return new NewNote(this.input);
            case Keywords.DELETE:
                return new Delete(this.input);
            default:
                return new Error(this.input);
        }
    }
}