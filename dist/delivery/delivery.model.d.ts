import { Document, Types } from 'mongoose';
export declare class Delivery extends Document {
    order_id: Types.ObjectId;
    street_add: string;
    street_add2?: string;
    city: string;
    state: string;
    home_no?: string;
}
export declare const DeliverySchema: import("mongoose").Schema<Delivery, import("mongoose").Model<Delivery, any, any, any, Document<unknown, any, Delivery, any> & Delivery & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Delivery, Document<unknown, {}, import("mongoose").FlatRecord<Delivery>, {}> & import("mongoose").FlatRecord<Delivery> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
