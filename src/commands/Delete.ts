import { Keywords } from "../flows/Keywords";
import { Command } from "./Command";

export class Delete extends Command {
    input: string;
    
    constructor(input: string) {
        super(input);
        this.input = input;
    }

    async execute(): Promise<string> {
        if(!this.isValid(Keywords.DELETE)) return `Wrong sintax of ${Keywords.DELETE}`;
        const result: boolean = await this.storage.deleteFile(this.getSecondParameter());
        return result ? `Note ${this.getSecondParameter()} is deleated` : `Cant deleate note ${this.getSecondParameter()}`;
    }

    isValid(keyword: Keywords): boolean {
        if(
            !this.input.startsWith(keyword) || 
            this.input.length < 2 || 
            this.input.split(" ").length < 2 ||
            this.input.split(" ").length > 2
          ) return false;
        return true;
    }
}