import { Keywords } from "../flows/Keywords";
import { getBuffer } from "../utils/Util";
import { Command } from "./Command";

export class NewNote extends Command {
    async execute(): Promise<string | null> {
        if(!this.isValid(Keywords.NEW)) return `Wrong sintax of ${Keywords.NEW}`;
        const myctx = this.ctx as any;
        myctx.scene.enter('NEW_NOTE');
        return null;
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