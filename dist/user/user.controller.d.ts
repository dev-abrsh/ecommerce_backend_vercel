import { UpdateProfileDto } from './dtos/updateProfile.dto';
import { UserService } from './user.service';
import { ChangePasswordDto } from './dtos/ChangePassword.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getProfile(req: any): Promise<import("mongoose").Document<unknown, {}, import("./user.model").User, {}> & import("./user.model").User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateProfile(req: any, updateDto: UpdateProfileDto): Promise<import("mongoose").Document<unknown, {}, import("./user.model").User, {}> & import("./user.model").User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    changePassword(req: any, dto: ChangePasswordDto): Promise<{
        message: string;
    }>;
    getAllUsers(): Promise<(import("mongoose").Document<unknown, {}, import("./user.model").User, {}> & import("./user.model").User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getUserById(id: string): Promise<import("mongoose").Document<unknown, {}, import("./user.model").User, {}> & import("./user.model").User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    deleteUser(id: string): Promise<{
        message: string;
    }>;
}
