import { OrderItemService } from './order-item.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
export declare class OrderItemController {
    private readonly orderItemService;
    constructor(orderItemService: OrderItemService);
    create(createOrderItemDto: CreateOrderItemDto): Promise<import("mongoose").Document<unknown, {}, import("./order-item.model").OrderItem, {}> & import("./order-item.model").OrderItem & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findAll(req: Request, page?: number, pageSize?: number, search?: string, product_id?: string, startPrice?: number, endPrice?: number): Promise<{
        items: (import("mongoose").Document<unknown, {}, import("./order-item.model").OrderItem, {}> & import("./order-item.model").OrderItem & Required<{
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
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./order-item.model").OrderItem, {}> & import("./order-item.model").OrderItem & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    update(id: string, updateOrderItemDto: UpdateOrderItemDto): Promise<import("mongoose").Document<unknown, {}, import("./order-item.model").OrderItem, {}> & import("./order-item.model").OrderItem & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
