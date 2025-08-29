import { Model } from 'mongoose';
import { Delivery } from './delivery.model';
import { CreateDeliveryDto } from './dto';
import { UpdateDeliveryDto } from './dto';
export declare class DeliveryService {
    private readonly deliveryModel;
    constructor(deliveryModel: Model<Delivery>);
    create(createDeliveryDto: CreateDeliveryDto): Promise<import("mongoose").Document<unknown, {}, Delivery, {}> & Delivery & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Delivery, {}> & Delivery & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, Delivery, {}> & Delivery & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    update(id: string, updateDeliveryDto: UpdateDeliveryDto): Promise<import("mongoose").Document<unknown, {}, Delivery, {}> & Delivery & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<{
        message: string;
        id: string;
    }>;
}
