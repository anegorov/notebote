import * as fs from 'fs';

export function getBuffer(str: string) : Buffer {
    return Buffer.from(str);
}

export function readFile(fileWithPath: string) : string {
    return fs.readFileSync(fileWithPath, 'utf8');
}

export function writeFile(fileWithPath: string, data: string) {
    fs.writeFileSync(fileWithPath, data);
}

export function appendFile(fileWithPath: string, data: string) {
    fs.appendFileSync(fileWithPath, data, 'utf8');
}