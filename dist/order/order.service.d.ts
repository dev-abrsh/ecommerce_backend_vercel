import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './order.model';
import { Model } from 'mongoose';
import { User } from 'src/user/user.model';
import { ChapaService } from 'chapa-nestjs';
import { ConfigService } from '@nestjs/config';
export declare class OrderService {
    private readonly orderModel;
    private readonly userModel;
    private readonly configService;
    private readonly chapaService;
    constructor(orderModel: Model<Order>, userModel: Model<User>, configService: ConfigService, chapaService: ChapaService);
    create(createOrderDto: CreateOrderDto): Promise<{
        order: import("mongoose").Document<unknown, {}, Order, {}> & Order & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
        payment_url: string;
    }>;
    findAll(req: Request, status?: string, page?: number, pageSize?: number, search?: string, user_id?: string): Promise<{
        items: (import("mongoose").Document<unknown, {}, Order, {}> & Order & Required<{
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
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, Order, {}> & Order & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<import("mongoose").Document<unknown, {}, Order, {}> & Order & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<{
        message: string;
        id: string;
    }>;
}
