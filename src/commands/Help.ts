import { Command } from "./Command";

export class Help extends Command {
    async execute(): Promise<string> {
        return 'Please read README again.';
    }
}