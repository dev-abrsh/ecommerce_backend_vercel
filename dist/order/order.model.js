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
exports.OrderSchema = exports.Order = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const mongoose_3 = require("mongoose");
let Order = class Order extends mongoose_3.Document {
    user_id;
    order_items;
    status;
    payment_reference;
    total_price;
    payment_status;
};
exports.Order = Order;
__decorate([
    (0, mongoose_2.Prop)({ type: mongoose_1.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], Order.prototype, "user_id", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: [{ type: mongoose_1.Types.ObjectId, ref: 'OrderItem' }], default: [] }),
    __metadata("design:type", Array)
], Order.prototype, "order_items", void 0);
__decorate([
    (0, mongoose_2.Prop)({ default: 'pending' }),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    (0, mongoose_2.Prop)(),
    __metadata("design:type", String)
], Order.prototype, "payment_reference", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: true }),
    __metadata("design:type", Number)
], Order.prototype, "total_price", void 0);
__decorate([
    (0, mongoose_2.Prop)({ default: 'pending' }),
    __metadata("design:type", String)
], Order.prototype, "payment_status", void 0);
exports.Order = Order = __decorate([
    (0, mongoose_2.Schema)({ timestamps: true }),
    (0, mongoose_2.Schema)({ timestamps: true })
], Order);
exports.OrderSchema = mongoose_2.SchemaFactory.createForClass(Order);
//# sourceMappingURL=order.model.js.map