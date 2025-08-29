import { User } from './user.model';
import { Model } from 'mongoose';
import { ChangePasswordDto } from './dtos/ChangePassword.dto';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    getAllUsers(): Promise<(import("mongoose").Document<unknown, {}, User, {}> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getUserById(id: string): Promise<import("mongoose").Document<unknown, {}, User, {}> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    deleteUser(id: string): Promise<{
        message: string;
    }>;
    getProfile(userId: string): Promise<import("mongoose").Document<unknown, {}, User, {}> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateProfile(userId: string, updateData: Partial<User>): Promise<import("mongoose").Document<unknown, {}, User, {}> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    changePassword(userId: string, dto: ChangePasswordDto): Promise<{
        message: string;
    }>;
}
