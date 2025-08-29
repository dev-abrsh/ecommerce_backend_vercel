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
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_model_1 = require("../order/order.model");
const products_model_1 = require("../products/products.model");
const brand_model_1 = require("../brand/brand.model");
const category_model_1 = require("../category/category.model");
let AnalyticsService = class AnalyticsService {
    orderModel;
    productModel;
    categoryModel;
    brandModel;
    constructor(orderModel, productModel, categoryModel, brandModel) {
        this.orderModel = orderModel;
        this.productModel = productModel;
        this.categoryModel = categoryModel;
        this.brandModel = brandModel;
    }
    async productsPerCategory() {
        return this.productModel.aggregate([
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category_id',
                    foreignField: '_id',
                    as: 'category'
                }
            },
            { $unwind: '$category' },
            {
                $group: {
                    _id: '$category.name',
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } }
        ]);
    }
    async productsPerBrand() {
        return this.productModel.aggregate([
            {
                $lookup: {
                    from: 'brands',
                    localField: 'brand_id',
                    foreignField: '_id',
                    as: 'brand'
                }
            },
            { $unwind: '$brand' },
            {
                $group: {
                    _id: '$brand.name',
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } }
        ]);
    }
    async totalSalesPerProduct() {
        return this.orderModel.aggregate([
            {
                $lookup: {
                    from: 'orderitems',
                    localField: 'order_items',
                    foreignField: '_id',
                    as: 'items'
                }
            },
            { $unwind: '$items' },
            {
                $lookup: {
                    from: 'products',
                    localField: 'items.product_id',
                    foreignField: '_id',
                    as: 'product'
                }
            },
            { $unwind: '$product' },
            {
                $group: {
                    _id: '$product.name',
                    totalRevenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
                }
            },
            { $sort: { totalRevenue: -1 } }
        ]);
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_model_1.Order.name)),
    __param(1, (0, mongoose_1.InjectModel)(products_model_1.Product.name)),
    __param(2, (0, mongoose_1.InjectModel)(category_model_1.Category.name)),
    __param(3, (0, mongoose_1.InjectModel)(brand_model_1.Brand.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map