import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';
import { ForgotPasswordDTO, LoginDto, ResetPasswordDto, VerifyEmailDto } from './dtos/login.dto';
import { ConfigService } from '@nestjs/config';
export declare class AuthController {
    private readonly authService;
    private config;
    constructor(authService: AuthService, config: ConfigService);
    signup(signUpData: SignupDto): Promise<{
        message: string;
    }>;
    login(LoginData: LoginDto): Promise<{
        accessToken: string;
    }>;
    forgotPassword(dto: ForgotPasswordDTO): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    resendOTP(email: string): Promise<{
        message: string;
    }>;
    verifyEmail(VerifyData: VerifyEmailDto): Promise<{
        message: string;
    }>;
    googleLogin(): Promise<void>;
    googleCallback(req: any, res: any): Promise<void>;
}
