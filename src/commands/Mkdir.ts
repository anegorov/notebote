import { Keywords } from "../flows/Keywords";
import { Command } from "./Command";

export class Mkdir extends Command {
    input: string;

    constructor(input: string){
        super(input);
        this.input = input;
    }

    async execute(): Promise<string> {
        if(!this.isValid(Keywords.MKDIR)) return 'Not valid command.';
        const tail: string = this.getTail();
        await this.storage.createFolder(tail);
        return "Dir is created"
    }
}