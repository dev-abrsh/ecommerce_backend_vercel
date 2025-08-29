export declare const multerImageConfig: {
    storage: import("multer").StorageEngine;
    limits: {
        fileSize: number;
    };
    fileFilter: (_req: any, file: any, cb: any) => any;
};
