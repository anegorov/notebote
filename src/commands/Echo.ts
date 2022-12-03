import { Keywords } from "../flows/Keywords";
import { appendFile, getBuffer, readFile } from "../utils/Util";
import { Command } from "./Command";

export class Echo extends Command {
    async execute(): Promise<string | null> {
        if(!this.isValid(Keywords.ECHO)) return `Wrong sintax of ${Keywords.ECHO}`;
        if(this.isAddable()){
            const fileData: string = await this.storage.downloadFromBuffer(this.getFileName());
            await this.storage.uploadBuffer(this.getFileName(), fileData + "\n" + this.getValue(), "");
            return `${this.getFileName()} is updated`;
        }
        return this.getValue();
    }

    isValid(keyword: Keywords): boolean {
        if(!this.getCurrentText().startsWith(keyword) ||
            this.getCurrentText().length < 6 ||
            this.getCurrentText().split(" ").length < 1 ||
            this.getValue() === null
          ) return false;
        return true;
    }

    getValue(): string | null {
        const matched: string[] | null = this.getTail().match(/(["'])(?:(?=(\\?))\2.)*?\1/);
        return matched ? matched[0].slice(1, -1) : null;
    }

    isAddable(): boolean {
        return this.getCurrentText().includes(">>");
    }

    getFileName(): string {
        return this.getCurrentText().split(">>")[1].trim();
    }

    getFileNameNoPath(): string {
        const lastIndex: number = this.getFileName().lastIndexOf("/");
        return lastIndex === -1 ? this.getFileName() : this.getFileName().substring(lastIndex, this.getTail().length - 1);
    }
}