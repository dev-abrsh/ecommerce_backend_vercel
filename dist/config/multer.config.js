"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerImageConfig = void 0;
const common_1 = require("@nestjs/common");
const multer_1 = require("multer");
exports.multerImageConfig = {
    storage: (0, multer_1.memoryStorage)(),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
        const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
        if (!allowed.includes(file.mimetype)) {
            return cb(new common_1.BadRequestException('Only JPG, PNG, or WEBP images are allowed'), false);
        }
        cb(null, true);
    },
};
//# sourceMappingURL=multer.config.js.map