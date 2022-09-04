import { Keywords } from "../flows/Keywords";
import { Command } from "./Command";

export class NewNote extends Command {
    input: string;
    
    constructor(input: string) {
        super(input);
        this.input = input;
    }

    async execute(): Promise<string> {
        if(!this.isValid(Keywords.NEW)) return `Wrong sintax of ${Keywords.NEW}`;
        const result:any = await this.storage.uploadFile("../templates/newNote.json", `${this.getSecondParameter()}.json`, "default");
        return result.key;
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