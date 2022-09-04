import { Note } from "../types/Types";
import { amendKeywords, keywords } from "./Keywords";

export default class Parser {
    input: string;

    constructor(input: string){
        this.input = input;
    }

    getJson(): Note {
        return {
            name: this.getName(),
            body: 'In progress'
        }
    }

    // private parser(input:string) {
    //     return {};
    // }

    private getName(): string {
        let commandName: string = ''; 
        if(this.isAmendCommand()){
            const firstSpaceIndex: number = this.input.indexOf(' ');
            const noCommanKeyword: string = this.input.slice(firstSpaceIndex, this.input.length);
            const secondSpaceIndex: number = noCommanKeyword.indexOf(' ');
            commandName = noCommanKeyword.slice(0, secondSpaceIndex);
        }
        return commandName;
    }

    isValidCommand(): boolean {
        return keywords.some((keyword) => this.input.includes(keyword));
    }

    private isAmendCommand(): boolean {
        return amendKeywords.some((keyword) => this.input.includes(keyword));
    }

    getStringAfterKeyword() {
        const index: number = this.input.indexOf(' ');
        return this.input.slice(index, this.input.length).trim();
    }
}