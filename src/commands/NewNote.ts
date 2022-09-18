import { Keywords } from "../flows/Keywords";
import { getBuffer } from "../utils/Util";
import { Command } from "./Command";

export class NewNote extends Command {
    async execute(): Promise<string> {
        if(!this.isValid(Keywords.NEW)) return `Wrong sintax of ${Keywords.NEW}`;
        // this.ctx.scene.enter('new-note')
        // const result:any = await this.storage.uploadFile("../templates/newNote.json", `${this.getSecondParameter()}.json`, "default");
        const result:any = await this.storage.uploadBuffer(this.getSecondParameter(), "TEXT TO ADD...");
        return result.key;
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