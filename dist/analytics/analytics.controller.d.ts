import { AnalyticsService } from './analytics.service';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    getProductsPerCategory(): Promise<any[]>;
    getProductsPerBrand(): Promise<any[]>;
    getSalesPerProduct(): Promise<any[]>;
}
