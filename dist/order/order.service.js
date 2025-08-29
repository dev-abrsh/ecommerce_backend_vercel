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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const order_model_1 = require("./order.model");
const mongoose_2 = require("mongoose");
const user_model_1 = require("../user/user.model");
const chapa_nestjs_1 = require("chapa-nestjs");
const config_1 = require("@nestjs/config");
let OrderService = class OrderService {
    orderModel;
    userModel;
    configService;
    chapaService;
    constructor(orderModel, userModel, configService, chapaService) {
        this.orderModel = orderModel;
        this.userModel = userModel;
        this.configService = configService;
        this.chapaService = chapaService;
    }
    async create(createOrderDto) {
        const user = await this.userModel.findById(createOrderDto.user_id);
        if (!user)
            throw new common_1.BadRequestException('User not found');
        const order = await this.orderModel.create({
            ...createOrderDto,
            status: 'pending',
            payment_status: 'unpaid',
        });
        const tx_ref = await this.chapaService.generateTransactionReference();
        const response = await this.chapaService.initialize({
            first_name: user.name,
            last_name: 'Customer',
            email: user.email,
            currency: 'ETB',
            amount: order.total_price.toString(),
            tx_ref: tx_ref,
            callback_url: `${this.configService.get('BASE_URL')}/payment/callback/${order._id}`,
            return_url: `https://www.google.com/`,
            customization: {
                title: 'Techify',
                description: `Payment for order ${order._id}`,
            },
        });
        return {
            order,
            payment_url: response.data.checkout_url,
        };
    }
    async findAll(req, status, page = 1, pageSize = 10, search, user_id) {
        const filter = {};
        if (status)
            filter.status = status;
        if (user_id)
            filter.user_id = user_id;
        if (search) {
            filter.$or = [
                { status: { $regex: search, $options: 'i' } },
                { payment_status: { $regex: search, $options: 'i' } },
            ];
        }
        const skip = (page - 1) * pageSize;
        const [items, totalItems] = await Promise.all([
            this.orderModel
                .find(filter)
                .skip(skip)
                .limit(pageSize)
                .sort({ createdAt: -1 })
                .populate('user_id', 'name email'),
            this.orderModel.countDocuments(filter),
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
        const order = await this.orderModel
            .findById(id)
            .populate({
            path: 'order_items',
            populate: {
                path: 'product_id',
                model: 'Product'
            }
        })
            .populate('user_id');
        if (!order)
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        return order;
    }
    async update(id, updateOrderDto) {
        const order = await this.orderModel.findByIdAndUpdate(id, updateOrderDto, {
            new: true,
        });
        if (!order)
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        return order;
    }
    async remove(id) {
        const order = await this.orderModel.findByIdAndDelete(id);
        if (!order)
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        return { message: 'Order deleted successfully', id };
    }
};
exports.OrderService = OrderService;
__decorate([
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, String, Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], OrderService.prototype, "findAll", null);
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_model_1.Order.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_model_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        config_1.ConfigService,
        chapa_nestjs_1.ChapaService])
], OrderService);
//# sourceMappingURL=order.service.js.map