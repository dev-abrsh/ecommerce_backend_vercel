"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_model_1 = require("../user/user.model");
const mongoose_1 = require("mongoose");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const mail_service_1 = require("../mail/mail.service");
const password_reset_template_1 = require("../mail/templates/password-reset.template");
const email_confirmation_template_1 = require("../mail/templates/email-confirmation.template");
const mongoose_2 = require("@nestjs/mongoose");
let AuthService = class AuthService {
    config;
    mailService;
    userModel;
    connection;
    jwtService;
    constructor(config, mailService, userModel, connection, jwtService) {
        this.config = config;
        this.mailService = mailService;
        this.userModel = userModel;
        this.connection = connection;
        this.jwtService = jwtService;
    }
    async signup(signupData) {
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            const { name, email, password } = signupData;
            const existingUser = await this.userModel
                .findOne({ email })
                .session(session);
            if (existingUser) {
                throw new common_1.BadRequestException('Email already exists');
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            await this.userModel.create([
                {
                    name,
                    email,
                    password: hashedPassword,
                    otp,
                    is_verified: false,
                },
            ], { session });
            await this.sendVerificationEmail(otp, email);
            await session.commitTransaction();
            session.endSession();
            return { message: 'User created successfully. Please check your email.' };
        }
        catch (error) {
            await session.abortTransaction();
            session.endSession();
            if (error instanceof common_1.BadRequestException)
                throw error;
            if (error.code === 11000 && error.keyPattern?.email) {
                throw new common_1.BadRequestException('Email already in use');
            }
            console.error('Signup Error:', error);
            throw new Error('An unexpected error occurred during signup');
        }
    }
    async ResendOTP(email) {
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            const existingUser = await this.userModel
                .findOne({ email })
                .session(session);
            if (!existingUser) {
                throw new common_1.BadRequestException("Email doesn't exist please signup first");
            }
            if (existingUser.is_verified) {
                throw new common_1.BadRequestException('Email already verified');
            }
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            await this.userModel.findByIdAndUpdate(existingUser._id, {
                otp,
                otpExpires: new Date(Date.now() + 5 * 60 * 1000),
                is_verified: false,
            }, { session });
            await this.sendVerificationEmail(otp, email);
            await session.commitTransaction();
            session.endSession();
            return { message: 'OTP resend successfully. Please check your email.' };
        }
        catch (error) {
            await session.abortTransaction();
            session.endSession();
            if (error instanceof common_1.BadRequestException)
                throw error;
            console.error('Signup Error:', error);
            throw new Error('An unexpected error occurred during sending OTP');
        }
    }
    async login(loginData) {
        const { email, password } = loginData;
        const user = await this.userModel.findOne({ email: email });
        if (!user) {
            throw new common_1.UnauthorizedException('Wrong credentials');
        }
        if (user && !user.is_verified) {
            throw new common_1.UnauthorizedException('Email not verified');
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new common_1.UnauthorizedException('Wrong credentials');
        }
        return this.generateUserToken(user._id, user.role);
    }
    async generateUserToken(userId, role) {
        const accessToken = this.jwtService.sign({ userId, role });
        return { accessToken };
    }
    async gettoken(id, email, time) {
        return await this.jwtService.signAsync({
            sub: id,
            email: email,
        }, {
            expiresIn: time,
            secret: this.config.get('JWT_SECRET'),
        });
    }
    async forgotPassword(email) {
        const user = await this.userModel.findOne({ email: email });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const token = await this.gettoken(user.id, user.email, '1d');
        const resetUrl = `${this.config.get('frontendUrl')}/reset-password`;
        const hashed = await bcrypt.hash(token, 10);
        await this.userModel.updateOne({ email }, {
            resetPasswordToken: hashed,
            resetPasswordExpires: new Date(Date.now() + 3600000),
        });
        const mjmlTemplate = (0, password_reset_template_1.resetPasswordTemplate)(resetUrl, token);
        const response = await this.mailService.sendEmail(user.email, 'Reset Your Password', mjmlTemplate);
        if (response.rejected.length > 0)
            throw new common_1.ForbiddenException('SMTP is reject sending message');
        return { message: 'Password reset link sent to your email' };
    }
    async sendVerificationEmail(otp, email) {
        const mjmlTemplate = (0, email_confirmation_template_1.emailVerificationTemplate)(otp);
        await this.mailService.sendEmail(email, 'Email Verification', mjmlTemplate);
        return { message: 'Email sent successfully' };
    }
    async verifyEmail(email, otp) {
        try {
            const user = await this.userModel.findOne({
                email: email,
                is_verified: false,
                otp: otp,
            });
            if (!user) {
                throw new common_1.UnauthorizedException('Invalid token');
            }
            if (user.otpExpires && new Date() > user.otpExpires) {
                throw new common_1.UnauthorizedException('OTP has expired');
            }
            await this.userModel.updateOne({ id: user.id }, { is_verified: true });
            await this.userModel.updateOne({ _id: user._id }, { is_verified: true });
            return { message: 'Email Verified successfully' };
        }
        catch (error) {
            console.log(error);
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
    }
    async resetPassword(token, newPassword) {
        try {
            const decoded = this.jwtService.verify(token);
            const user = await this.userModel.findOne({ _id: decoded.sub });
            if (!user || !user.resetPasswordToken || !user.resetPasswordExpires) {
                console.log('check');
                throw new common_1.BadRequestException('Invalid or expired token');
            }
            if (new Date() > user.resetPasswordExpires) {
                throw new common_1.BadRequestException('Token has expired');
            }
            const isValid = await bcrypt.compare(token, user.resetPasswordToken);
            if (!isValid) {
                throw new common_1.BadRequestException('Invalid reset token');
            }
            const password = await bcrypt.hash(newPassword, 10);
            await this.userModel.updateOne({ _id: user.id }, {
                password,
                resetPasswordToken: null,
                resetPasswordExpires: null,
            });
            return { message: 'Password successfully reset' };
        }
        catch (error) {
            console.log(error);
            throw new common_1.NotFoundException('Invalid or expired token');
        }
    }
    async validateGoogleUser(googleUser) {
        const user = await this.userModel.findOne({ email: googleUser.email });
        console.log('googleUser: ', googleUser);
        if (user)
            return user;
        return this.userModel.create({
            name: googleUser.name,
            email: googleUser.email,
            password: ' ',
            is_verified: googleUser.is_verified,
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, mongoose_2.InjectModel)(user_model_1.User.name)),
    __param(3, (0, mongoose_2.InjectConnection)()),
    __metadata("design:paramtypes", [config_1.ConfigService,
        mail_service_1.MailService,
        mongoose_1.Model,
        mongoose_1.Connection,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map