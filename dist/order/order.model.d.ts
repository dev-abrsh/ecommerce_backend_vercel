import { Types } from 'mongoose';
import { Document } from 'mongoose';
export declare class Order extends Document {
    user_id: Types.ObjectId;
    order_items: Types.ObjectId[];
    status: string;
    payment_reference?: string;
    total_price: number;
    payment_status?: string;
}
export declare const OrderSchema: import("mongoose").Schema<Order, import("mongoose").Model<Order, any, any, any, Document<unknown, any, Order, any> & Order & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Order, Document<unknown, {}, import("mongoose").FlatRecord<Order>, {}> & import("mongoose").FlatRecord<Order> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
