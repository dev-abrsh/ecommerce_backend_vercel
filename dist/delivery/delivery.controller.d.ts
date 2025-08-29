import { DeliveryService } from './delivery.service';
import { CreateDeliveryDto } from './dto';
import { UpdateDeliveryDto } from './dto';
export declare class DeliveryController {
    private readonly deliveryService;
    constructor(deliveryService: DeliveryService);
    create(createDeliveryDto: CreateDeliveryDto): Promise<import("mongoose").Document<unknown, {}, import("./delivery.model").Delivery, {}> & import("./delivery.model").Delivery & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./delivery.model").Delivery, {}> & import("./delivery.model").Delivery & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./delivery.model").Delivery, {}> & import("./delivery.model").Delivery & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    update(id: string, updateDeliveryDto: UpdateDeliveryDto): Promise<import("mongoose").Document<unknown, {}, import("./delivery.model").Delivery, {}> & import("./delivery.model").Delivery & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<{
        message: string;
        id: string;
    }>;
}
