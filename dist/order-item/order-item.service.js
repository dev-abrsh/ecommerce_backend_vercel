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
exports.OrderItemService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const order_item_model_1 = require("./order-item.model");
const products_model_1 = require("../products/products.model");
const mongoose_2 = require("mongoose");
let OrderItemService = class OrderItemService {
    orderItemModel;
    productModel;
    constructor(orderItemModel, productModel) {
        this.orderItemModel = orderItemModel;
        this.productModel = productModel;
    }
    async create(createOrderItemDto) {
        const product = await this.productModel.findById(createOrderItemDto.product_id);
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        const created = new this.orderItemModel(createOrderItemDto);
        return await created.save();
    }
    async findAll(page = 1, pageSize = 10, search, product_id, startPrice, endPrice) {
        const skip = (page - 1) * pageSize;
        const filter = {};
        if (product_id) {
            filter.product_id = product_id;
        }
        if (startPrice !== undefined || endPrice !== undefined) {
            filter.price = {};
            if (startPrice !== undefined)
                filter.price.$gte = startPrice;
            if (endPrice !== undefined)
                filter.price.$lte = endPrice;
        }
        if (search) {
            filter.$or = [
                { price: { $regex: search, $options: 'i' } },
                { quantity: { $regex: search, $options: 'i' } },
            ];
        }
        const [items, totalItems] = await Promise.all([
            this.orderItemModel
                .find(filter)
                .populate('product_id')
                .skip(skip)
                .limit(pageSize)
                .exec(),
            this.orderItemModel.countDocuments(filter),
        ]);
        return {
            items,
            pagination: {
                totalItems,
                totalPages: Math.ceil(totalItems / pageSize),
                currentPage: page,
                pageSize,
            },
        };
    }
    async findOne(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id))
            throw new common_1.NotFoundException('Invalid ID');
        const item = await this.orderItemModel.findById(id).populate('product_id').populate('order_id');
        if (!item)
            throw new common_1.NotFoundException('Order item not found');
        return item;
    }
    async update(id, updateOrderItemDto) {
        if (!mongoose_2.Types.ObjectId.isValid(id))
            throw new common_1.NotFoundException('Invalid ID');
        const updated = await this.orderItemModel
            .findByIdAndUpdate(id, updateOrderItemDto, { new: true })
            .populate('product_id')
            .populate('order_id');
        if (!updated)
            throw new common_1.NotFoundException('Order item not found');
        return updated;
    }
    async remove(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id))
            throw new common_1.NotFoundException('Invalid ID');
        const deleted = await this.orderItemModel.findByIdAndDelete(id);
        if (!deleted)
            throw new common_1.NotFoundException('Order item not found');
        return { message: 'Order item deleted successfully' };
    }
};
exports.OrderItemService = OrderItemService;
exports.OrderItemService = OrderItemService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_item_model_1.OrderItem.name)),
    __param(1, (0, mongoose_1.InjectModel)(products_model_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], OrderItemService);
//# sourceMappingURL=order-item.service.js.map