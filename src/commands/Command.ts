import { Context } from "telegraf";
import { Keywords } from "../flows/Keywords";
import Saver from "../service/Saver";
import { ICommand } from "../types/Types";

export class Command implements ICommand {
    storage: Saver = new Saver();
    ctx: Context;

    constructor(ctx: Context){
        this.ctx = ctx;
    }

    async execute(): Promise<string | null> {
        return 'Smth wrong';
    }

    isValid(keyword: Keywords): boolean {
        if(!this.getCurrentText().startsWith(keyword) || this.getCurrentText().length < 2) return false;
        return true;
    }

    getTail(): string {
        if(!this.getCurrentText().trim().includes(' ')) return '/';
        return this.getCurrentText().trim().split(' ')[1];
    }

    getSecondParameter(): string {
        return this.getTail().split(' ')[0];
    }

    getCurrentText(): string {
        const update: any = this.ctx.update;
        return update.message.text;
    }

    getPath(): string {
        const lastIndex = this.getTail().lastIndexOf("/");
        return this.getTail().substring(0, lastIndex);
    }
}