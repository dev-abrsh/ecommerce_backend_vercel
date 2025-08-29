"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsModule = void 0;
const common_1 = require("@nestjs/common");
const products_service_1 = require("./products.service");
const products_controller_1 = require("./products.controller");
const mongoose_1 = require("@nestjs/mongoose");
const products_model_1 = require("./products.model");
const category_model_1 = require("../category/category.model");
const brand_model_1 = require("../brand/brand.model");
const category_module_1 = require("../category/category.module");
const brand_module_1 = require("../brand/brand.module");
const cloudinary_module_1 = require("../cloudinary/cloudinary.module");
let ProductsModule = class ProductsModule {
};
exports.ProductsModule = ProductsModule;
exports.ProductsModule = ProductsModule = __decorate([
    (0, common_1.Module)({
        providers: [products_service_1.ProductsService],
        controllers: [products_controller_1.ProductsController],
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: products_model_1.Product.name, schema: products_model_1.ProductSchema },
                { name: category_model_1.Category.name, schema: category_model_1.CategorySchema },
                { name: brand_model_1.Brand.name, schema: brand_model_1.BrandSchema },
            ]),
            category_module_1.CategoryModule,
            brand_module_1.BrandModule,
            cloudinary_module_1.CloudinaryModule,
        ],
    })
], ProductsModule);
//# sourceMappingURL=products.module.js.map