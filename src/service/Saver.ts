import { YBucket, YBucketItem } from "../types/Types";

const EasyYandexS3 = require("easy-yandex-s3");

export default class Saver {

    readonly s3 = new EasyYandexS3({
        auth: {
            accessKeyId: "Q8oEPP1-F5B3NZFb_mY9",
            secretAccessKey: "fQvKwuTuyjWG8e4AsK8WKwEthxRltQV7MYbTEXFQ",
        },
        Bucket: "os-an-telegram-bot",
        debug: true
    });

    private localStorage: string[] = [];
    
    setValue(val:string) {
        this.localStorage.push(val);
    }

    getValues(): string[] {
        return this.localStorage;
    }

    async set(){
        await this.s3.Upload({path: "../test/file.rtf", name: 'test.rtf'}, "/test1/");
    }

    async list(pointer: string = '/'): Promise<string[]>{
        const bucketContent: YBucket = await this.s3.GetList(pointer);
        if(bucketContent.KeyCount === 0){
            return [];
        }
        const files: string[] = bucketContent.Contents.map(file => file.Key);
        const folders: string[] = bucketContent.CommonPrefixes.map(folder => folder.Prefix);
        return [...folders, ...files];
    }
}