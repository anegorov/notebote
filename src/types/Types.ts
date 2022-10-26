import { Context } from "telegraf";

export interface Note {
    name: string;
    body: string;
}

export interface YBucketItem {
    Key: string;
    LastModified: string;
    Size: number;
}

export interface YBucket {
    IsTruncated: boolean;
    Contents: YBucketItem[];
    Name: string;
    Prefix: string;
    KeyCount: number;
    CommonPrefixes: Prefix[];
}

export interface YResponse {
    ETag: string;
    Location: string;
    key: string;
    Key: string;
    Bucket: string;
}  

export interface Prefix {
    Prefix: string;
}

export interface ICommand {
    execute(): Promise<string | null>;
}

export interface SessionData {
	messageContext: Context;
}

export interface BotContext extends Context {
	session?: SessionData;
}