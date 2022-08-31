import { Keywords } from "../flows/Keywords";
import { Command } from "./Command";

export class Ls extends Command {
    input: string;

    constructor(input: string){
        super();
        this.input = input;
    }

    async execute(): Promise<string> {
        if(!this.isValid()) return 'Not valid command. $ls should contains max one whitespace.';
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

    private isValid(): boolean {
        if(!this.input.startsWith(Keywords.LIST)) return false;
        if(this.input.trim().split(' ').length > 2) return false;
        return true;
    }

    private getTail(): string {
        if(!this.input.trim().includes(' ')) return '/';
        return this.input.trim().split(' ')[1];
    }
}