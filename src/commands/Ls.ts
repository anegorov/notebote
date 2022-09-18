import { Keywords } from "../flows/Keywords";
import { Command } from "./Command";

export class Ls extends Command {
    async execute(): Promise<string> {
        if(!this.isValid(Keywords.LIST)) return 'Not valid command.';
        const tail: string = this.getTail();

        if(tail === '/') {
            const list: string[] = await this.storage.listAll();
            return list.join('\r\n');
        }

        const list: string[] = await this.storage.list(tail);
        if(list.length === 0){
            return 'No such paths';
        }
        return list.join('\r\n');
    }
}