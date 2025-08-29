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
exports.PaymentController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_model_1 = require("../order/order.model");
const order_service_1 = require("../order/order.service");
let PaymentController = class PaymentController {
    orderModel;
    orderService;
    constructor(orderModel, orderService) {
        this.orderModel = orderModel;
        this.orderService = orderService;
    }
    async chapaCallback(req, orderId, status, trx_ref, ref_id, res) {
        console.log("orderId: ", orderId);
        console.log("status: ", status);
        console.log("trx_ref: ", trx_ref);
        console.log("ref_id: ", ref_id);
        if (status === 'success') {
            await this.orderService.update(orderId, {
                status: 'confirmed',
                payment_status: 'paid',
            });
        }
        else {
            await this.orderService.update(orderId, {
                payment_status: 'failed',
                status: 'cancelled',
            });
        }
        return res.status(200).send('Payment callback handled.');
    }
    async verifyPayment(transactionId, res) {
        const order = await this.orderModel.findOne({ payment_reference: transactionId });
        return res.status(200).send(order);
    }
};
exports.PaymentController = PaymentController;
__decorate([
    (0, common_1.Get)('callback/:orderId'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('orderId')),
    __param(2, (0, common_1.Query)('status')),
    __param(3, (0, common_1.Query)('trx_ref')),
    __param(4, (0, common_1.Query)('ref_id')),
    __param(5, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, String, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "chapaCallback", null);
__decorate([
    (0, common_1.Get)('verify'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Query)('tansactionId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "verifyPayment", null);
exports.PaymentController = PaymentController = __decorate([
    (0, common_1.Controller)('payment'),
    __param(0, (0, mongoose_1.InjectModel)(order_model_1.Order.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        order_service_1.OrderService])
], PaymentController);
//# sourceMappingURL=payment.controller.js.map