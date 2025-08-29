import { Document } from 'mongoose';
export declare enum UserRole {
    ADMIN = "admin",
    CUSTOMER = "customer"
}
export declare class User extends Document {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    role: UserRole;
    otp: string;
    otpExpires: Date;
    is_verified: boolean;
    resetPasswordToken: string;
    resetPasswordExpires: Date;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User, any> & User & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>, {}> & import("mongoose").FlatRecord<User> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
