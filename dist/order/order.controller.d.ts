import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    create(createOrderDto: CreateOrderDto): Promise<{
        order: import("mongoose").Document<unknown, {}, import("./order.model").Order, {}> & import("./order.model").Order & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
        payment_url: string;
    }>;
    findAll(req: Request, status?: string, page?: number, pageSize?: number, search?: string, user_id?: string): Promise<{
        items: (import("mongoose").Document<unknown, {}, import("./order.model").Order, {}> & import("./order.model").Order & Required<{
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
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./order.model").Order, {}> & import("./order.model").Order & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<import("mongoose").Document<unknown, {}, import("./order.model").Order, {}> & import("./order.model").Order & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<{
        message: string;
        id: string;
    }>;
}
