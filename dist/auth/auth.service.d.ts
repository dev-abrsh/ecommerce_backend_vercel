import { SignupDto } from './dtos/signup.dto';
import { User, UserRole } from '../user/user.model';
import { Connection, Model } from 'mongoose';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MailService } from '../mail/mail.service';
export declare class AuthService {
    private config;
    private mailService;
    private userModel;
    private readonly connection;
    private jwtService;
    constructor(config: ConfigService, mailService: MailService, userModel: Model<User>, connection: Connection, jwtService: JwtService);
    signup(signupData: SignupDto): Promise<{
        message: string;
    }>;
    ResendOTP(email: string): Promise<{
        message: string;
    }>;
    login(loginData: LoginDto): Promise<{
        accessToken: string;
    }>;
    generateUserToken(userId: any, role: UserRole): Promise<{
        accessToken: string;
    }>;
    gettoken(id: number, email: string, time: string): Promise<string>;
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    sendVerificationEmail(otp: string, email: string): Promise<{
        message: string;
    }>;
    verifyEmail(email: string, otp: string): Promise<{
        message: string;
    }>;
    resetPassword(token: string, newPassword: string): Promise<{
        message: string;
    }>;
    validateGoogleUser(googleUser: {
        name: string;
        email: string;
        is_verified: boolean;
    }): Promise<import("mongoose").Document<unknown, {}, User, {}> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
