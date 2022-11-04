import { Keywords } from "../flows/Keywords";
import { readFile } from "../utils/Util";
import { Command } from "./Command";

export class Cat extends Command {
    async execute(): Promise<string> {
        if(!this.isValid(Keywords.CAT)) return 'Not valid command.';
        const tail: string = this.getTail();

        const note = await this.storage.download(tail, "note10");
        
        return await readFile("note10");
    }
}