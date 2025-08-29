import { Types } from 'mongoose';
import { Document } from 'mongoose';
export declare class OrderItem extends Document {
    product_id: Types.ObjectId;
    quantity: number;
    price: number;
}
export declare const OrderItemSchema: import("mongoose").Schema<OrderItem, import("mongoose").Model<OrderItem, any, any, any, Document<unknown, any, OrderItem, any> & OrderItem & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, OrderItem, Document<unknown, {}, import("mongoose").FlatRecord<OrderItem>, {}> & import("mongoose").FlatRecord<OrderItem> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
