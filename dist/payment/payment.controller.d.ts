import { Model } from 'mongoose';
import { Order } from '../order/order.model';
import { OrderService } from '../order/order.service';
export declare class PaymentController {
    private readonly orderModel;
    private readonly orderService;
    constructor(orderModel: Model<Order>, orderService: OrderService);
    chapaCallback(req: Request, orderId: string, status: string, trx_ref: string, ref_id: string, res: any): Promise<any>;
    verifyPayment(transactionId: string, res: any): Promise<any>;
}
