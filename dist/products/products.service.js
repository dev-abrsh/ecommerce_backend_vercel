"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const products_model_1 = require("./products.model");
const mongoose_2 = require("mongoose");
const stream_1 = require("stream");
const mongoose_3 = require("mongoose");
const category_model_1 = require("../category/category.model");
const brand_model_1 = require("../brand/brand.model");
let ProductsService = class ProductsService {
    productModel;
    categoryModel;
    brandModel;
    cloudinary;
    constructor(productModel, categoryModel, brandModel, cloudinary) {
        this.productModel = productModel;
        this.categoryModel = categoryModel;
        this.brandModel = brandModel;
        this.cloudinary = cloudinary;
    }
    async createProduct(createProductDto, imageUrl) {
        const category = await this.categoryModel.findOne({
            name: createProductDto.category,
        });
        if (!category) {
            throw new common_1.NotFoundException(`Category "${createProductDto.category}" not found`);
        }
        const brand = await this.brandModel.findOne({
            name: createProductDto.brand,
        });
        if (!brand) {
            throw new common_1.NotFoundException(`Brand "${createProductDto.brand}" not found`);
        }
        const product = new this.productModel({
            ...createProductDto,
            category_id: category._id,
            brand_id: brand._id,
            image_url: imageUrl,
        });
        return await product.save();
    }
    async getAllProducts() {
        return await this.productModel
            .find()
            .populate('category_id')
            .populate('brand_id');
    }
    async getProductById(id) {
        const product = await this.productModel
            .findById(id)
            .populate('category_id')
            .populate('brand_id');
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        return product;
    }
    async updateProduct(id, updateDto) {
        const updated = await this.productModel.findByIdAndUpdate(id, updateDto, {
            new: true,
        });
        if (!updated)
            throw new common_1.NotFoundException('Product not found');
        return updated;
    }
    async deleteProduct(id) {
        const result = await this.productModel.findByIdAndDelete(id);
        if (!result)
            throw new common_1.NotFoundException('Product not found');
    }
    async getProducts(filters = {}) {
        const query = {};
        if (filters.keyword) {
            query.$or = [
                { name: { $regex: filters.keyword, $options: 'i' } },
                { description: { $regex: filters.keyword, $options: 'i' } },
                { modelNumber: { $regex: filters.keyword, $options: 'i' } },
                { color: { $regex: filters.keyword, $options: 'i' } },
            ];
            if (!isNaN(Number(filters.keyword))) {
                query.$or.push({ price: Number(filters.keyword) });
            }
        }
        if (filters.name)
            query.name = { $regex: filters.name, $options: 'i' };
        if (filters.description)
            query.description = { $regex: filters.description, $options: 'i' };
        if (filters.category)
            query['category_id'] = filters.category;
        if (filters.brand)
            query['brand_id'] = filters.brand;
        if (filters.ram)
            query.ram = filters.ram;
        if (filters.storage)
            query.storage = filters.storage;
        if (filters.screenSize)
            query.screenSize = filters.screenSize;
        if (filters.battery)
            query.battery = filters.battery;
        if (filters.color)
            query.color = filters.color;
        if (filters.modelNumber)
            query.modelNumber = filters.modelNumber;
        if (filters.rating)
            query.rating = { $gte: filters.rating };
        if (filters.minPrice || filters.maxPrice) {
            query.price = {};
            if (filters.minPrice)
                query.price.$gte = filters.minPrice;
            if (filters.maxPrice)
                query.price.$lte = filters.maxPrice;
        }
        const page = filters.page || 1;
        const limit = filters.limit || 10;
        const skip = (page - 1) * limit;
        const sort = {};
        if (filters.sortBy) {
            sort[filters.sortBy] = filters.sortOrder === 'desc' ? -1 : 1;
        }
        const results = await this.productModel
            .find(query)
            .populate('brand_id', 'name')
            .populate('category_id', 'name')
            .skip(skip)
            .limit(limit)
            .sort(sort)
            .exec();
        const total = await this.productModel.countDocuments(query);
        return {
            data: results,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async filterProducts(filters) {
        const query = {};
        if (filters.category && mongoose_3.Types.ObjectId.isValid(filters.category)) {
            query.category_id = new mongoose_3.Types.ObjectId(filters.category);
        }
        if (filters.brand && mongoose_3.Types.ObjectId.isValid(filters.brand)) {
            query.brand_id = new mongoose_3.Types.ObjectId(filters.brand);
        }
        if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
            query.price = {};
            if (filters.minPrice !== undefined)
                query.price.$gte = filters.minPrice;
            if (filters.maxPrice !== undefined)
                query.price.$lte = filters.maxPrice;
        }
        return this.productModel
            .find(query)
            .populate('category_id')
            .populate('brand_id')
            .exec();
    }
    async uploadImage(file) {
        if (!file?.buffer || !file.mimetype) {
            throw new common_1.BadRequestException('Invalid image file');
        }
        const publicIdBase = this.slugBase(file.originalname);
        const secureUrl = await new Promise((resolve, reject) => {
            const stream = this.cloudinary.uploader.upload_stream({
                folder: 'products',
                resource_type: 'image',
                public_id: `${publicIdBase}-${Date.now()}`,
                overwrite: false,
            }, (error, result) => {
                if (error)
                    return reject(new common_1.BadRequestException(error.message));
                resolve(result.secure_url);
            });
            stream_1.Readable.from(file.buffer).pipe(stream);
        });
        return secureUrl;
    }
    slugBase(filename) {
        const noExt = filename.replace(/\.[^/.]+$/, '');
        return noExt
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(products_model_1.Product.name)),
    __param(1, (0, mongoose_1.InjectModel)(category_model_1.Category.name)),
    __param(2, (0, mongoose_1.InjectModel)(brand_model_1.Brand.name)),
    __param(3, (0, common_1.Inject)('CLOUDINARY')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model, Object])
], ProductsService);
//# sourceMappingURL=products.service.js.map