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

export interface Prefix {
    Prefix: string;
}