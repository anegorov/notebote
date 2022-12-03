import { Keywords } from "../flows/Keywords";
import { Command } from "./Command";

export class Cat extends Command {
    async execute(): Promise<string> {
        if(!this.isValid(Keywords.CAT)) return 'Not valid command.';
        const tail: string = this.getTail();
        return await this.storage.downloadFromBuffer(tail);
    }
}