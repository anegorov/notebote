import { Context } from "telegraf";
import { Keywords } from "../flows/Keywords";
import { Command } from "./Command";

export class Delete extends Command {
    async execute(): Promise<string> {
        if(!this.isValid(Keywords.DELETE)) return `Wrong sintax of ${Keywords.DELETE}`;
        const result: boolean = await this.storage.deleteFile(this.getSecondParameter());
        return result ? `Note ${this.getSecondParameter()} is deleated` : `Cant deleate note ${this.getSecondParameter()}`;
    }

    isValid(keyword: Keywords): boolean {
        if(
            !this.getCurrentText().startsWith(keyword) || 
            this.getCurrentText().length < 2 || 
            this.getCurrentText().split(" ").length < 2 ||
            this.getCurrentText().split(" ").length > 2
          ) return false;
        return true;
    }
}