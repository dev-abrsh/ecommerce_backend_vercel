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
exports.DeliverySchema = exports.Delivery = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_model_1 = require("../order/order.model");
let Delivery = class Delivery extends mongoose_2.Document {
    order_id;
    street_add;
    street_add2;
    city;
    state;
    home_no;
};
exports.Delivery = Delivery;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: order_model_1.Order.name, required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Delivery.prototype, "order_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Delivery.prototype, "street_add", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Delivery.prototype, "street_add2", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Delivery.prototype, "city", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Delivery.prototype, "state", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Delivery.prototype, "home_no", void 0);
exports.Delivery = Delivery = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Delivery);
exports.DeliverySchema = mongoose_1.SchemaFactory.createForClass(Delivery);
//# sourceMappingURL=delivery.model.js.map