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
exports.DeliveryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const delivery_model_1 = require("./delivery.model");
let DeliveryService = class DeliveryService {
    deliveryModel;
    constructor(deliveryModel) {
        this.deliveryModel = deliveryModel;
    }
    async create(createDeliveryDto) {
        const delivery = await this.deliveryModel.create(createDeliveryDto);
        return delivery;
    }
    async findAll() {
        return this.deliveryModel.find().populate('order_id');
    }
    async findOne(id) {
        const delivery = await this.deliveryModel.findById(id).populate('order_id');
        if (!delivery)
            throw new common_1.NotFoundException(`Delivery with ID ${id} not found`);
        return delivery;
    }
    async update(id, updateDeliveryDto) {
        const delivery = await this.deliveryModel.findByIdAndUpdate(id, updateDeliveryDto, { new: true });
        if (!delivery)
            throw new common_1.NotFoundException(`Delivery with ID ${id} not found`);
        return delivery;
    }
    async remove(id) {
        const delivery = await this.deliveryModel.findByIdAndDelete(id);
        if (!delivery)
            throw new common_1.NotFoundException(`Delivery with ID ${id} not found`);
        return { message: 'Delivery deleted successfully', id };
    }
};
exports.DeliveryService = DeliveryService;
exports.DeliveryService = DeliveryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(delivery_model_1.Delivery.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], DeliveryService);
//# sourceMappingURL=delivery.service.js.map