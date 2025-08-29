export declare class GetProductsDto {
    keyword?: string;
    name?: string;
    description?: string;
    minPrice?: number;
    maxPrice?: number;
    rating?: number;
    category?: string;
    brand?: string;
    ram?: string;
    storage?: string;
    screenSize?: string;
    battery?: string;
    color?: string;
    modelNumber?: string;
    page: number;
    limit: number;
    sortBy?: string;
    sortOrder: 'asc' | 'desc';
}
