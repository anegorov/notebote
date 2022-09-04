import { Keywords } from "../flows/Keywords";
import Saver from "../service/Saver";

export class Command {
    storage: Saver = new Saver();

    input: string;

    constructor(input: string){
        this.input = input;
    }

    async execute(): Promise<string> {
        return 'Smth wrong';
    }

    isValid(keyword: Keywords): boolean {
        if(!this.input.startsWith(keyword) || this.input.length < 2) return false;
        return true;
    }

    getTail(): string {
        if(!this.input.trim().includes(' ')) return '/';
        return this.input.trim().split(' ')[1];
    }

    getSecondParameter(): string {
        return this.getTail().split(' ')[0];
    }
}