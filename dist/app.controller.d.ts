import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    SomeProtectedRoute(req: any): {
        message: string;
        userId: any;
    };
}
