import { Command } from "./Command";

export class Error extends Command {
    async execute(): Promise<string> {
        return "Can\'t recognize this command";
    }
}