import { YBucket, YBucketItem, YResponse } from "../types/Types";
import { getBuffer } from "../utils/Util";

const config = require('config');
const EasyYandexS3 = require("easy-yandex-s3");

export default class Saver {

    readonly s3 = new EasyYandexS3({
        auth: {
            accessKeyId: config.get("accessKeyId"),
            secretAccessKey: config.get("secretAccessKey"),
        },
        Bucket: config.get("bucket"),
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
        await this.s3.Upload({path: "../test/file.rtf", name: 'test.rtf'}, "/default/");
    }

    async deleteFile(path: string): Promise<boolean> {
        return await this.s3.Remove(path);
    }

   async uploadFileFromBuffer(file_buffer: Buffer, targetDirName: string = "default"): Promise<void> {
        await this.s3.Upload({buffer: file_buffer}, `/${targetDirName}/`);
   }

   async uploadFile(
        sourceFilePath: string = "../templates/newNote.json",
        targetFileName: string,
        targetDirName: string = "default"
    ): Promise<any> {
        return await this.s3.Upload({path: sourceFilePath, name: targetFileName}, `/${targetDirName}/`);
   }

   async uploadBuffer(fileName: string, data: string, path: string): Promise<YResponse> {
        return await this.s3.Upload({buffer: getBuffer(data), name: fileName}, path);
   }

   async createFolder(name: string) {
        await this.s3.Upload(`/${name}`);
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

    async listAll(): Promise<string[]> {
        const bucketContent: YBucket = await this.s3.GetList('/');
        if(bucketContent.KeyCount === 0) return [];
        const rootFolders: string[] = bucketContent.CommonPrefixes.map(folder => folder.Prefix);
        const allFolders: string[] = await this.getFolders(rootFolders);
        let allElements: string[] = [];
        for(const folder of allFolders) {
            const bucketContent: YBucket = await this.s3.GetList(folder);
            allElements.push(...bucketContent.Contents.map(file => file.Key));
        }
        return allElements;
    }

    private async getFolders(folders: string[]): Promise<string[]> {
        let result: string[] = folders;
        for(const folder of folders) {
                if(folder !== "/") {
                    const bucketContent: YBucket = await this.s3.GetList(folder);
                    result.push(...bucketContent.CommonPrefixes.map(f => f.Prefix));    
                }
        }
        return result;
    }
}