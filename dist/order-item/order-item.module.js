"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const products_model_1 = require("../products/products.model");
const order_item_controller_1 = require("./order-item.controller");
const order_item_model_1 = require("./order-item.model");
const order_item_service_1 = require("./order-item.service");
let OrderItemModule = class OrderItemModule {
};
exports.OrderItemModule = OrderItemModule;
exports.OrderItemModule = OrderItemModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: order_item_model_1.OrderItem.name, schema: order_item_model_1.OrderItemSchema },
                { name: products_model_1.Product.name, schema: products_model_1.ProductSchema },
            ]),
        ],
        controllers: [order_item_controller_1.OrderItemController],
        providers: [order_item_service_1.OrderItemService],
    })
], OrderItemModule);
//# sourceMappingURL=order-item.module.js.map