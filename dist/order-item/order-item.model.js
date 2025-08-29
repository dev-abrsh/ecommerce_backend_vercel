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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemSchema = exports.OrderItem = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const mongoose_3 = require("mongoose");
let OrderItem = class OrderItem extends mongoose_3.Document {
    product_id;
    quantity;
    price;
};
exports.OrderItem = OrderItem;
__decorate([
    (0, mongoose_2.Prop)({ type: mongoose_1.Types.ObjectId, ref: 'Product' }),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], OrderItem.prototype, "product_id", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: true }),
    __metadata("design:type", Number)
], OrderItem.prototype, "quantity", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: true }),
    __metadata("design:type", Number)
], OrderItem.prototype, "price", void 0);
exports.OrderItem = OrderItem = __decorate([
    (0, mongoose_2.Schema)({ timestamps: true })
], OrderItem);
exports.OrderItemSchema = mongoose_2.SchemaFactory.createForClass(OrderItem);
//# sourceMappingURL=order-item.model.js.map