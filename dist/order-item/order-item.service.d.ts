import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItem } from './order-item.model';
import { Product } from '../products/products.model';
import { Model } from 'mongoose';
export declare class OrderItemService {
    private readonly orderItemModel;
    private readonly productModel;
    constructor(orderItemModel: Model<OrderItem>, productModel: Model<Product>);
    create(createOrderItemDto: CreateOrderItemDto): Promise<import("mongoose").Document<unknown, {}, OrderItem, {}> & OrderItem & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findAll(page?: number, pageSize?: number, search?: string, product_id?: string, startPrice?: number, endPrice?: number): Promise<{
        items: (import("mongoose").Document<unknown, {}, OrderItem, {}> & OrderItem & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
        pagination: {
            totalItems: number;
            totalPages: number;
            currentPage: number;
            pageSize: number;
        };
    }>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, OrderItem, {}> & OrderItem & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    update(id: string, updateOrderItemDto: UpdateOrderItemDto): Promise<import("mongoose").Document<unknown, {}, OrderItem, {}> & OrderItem & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
