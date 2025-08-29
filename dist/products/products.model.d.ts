import { Document, Schema as MongooseSchema } from 'mongoose';
export type ProductDocument = Product & Document;
export declare class Product {
    name: string;
    description: string;
    price: number;
    rating: number;
    category_id: MongooseSchema.Types.ObjectId;
    brand_id: MongooseSchema.Types.ObjectId;
    stock_quantity: number;
    image_url: string;
    ram: string;
    storage: string;
    processor: string;
    screen_size: string;
    battery: string;
    color: string;
    model_number: string;
    warranty: string;
    created_by: string;
}
export declare const ProductSchema: MongooseSchema<Product, import("mongoose").Model<Product, any, any, any, Document<unknown, any, Product, any> & Product & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Product, Document<unknown, {}, import("mongoose").FlatRecord<Product>, {}> & import("mongoose").FlatRecord<Product> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
