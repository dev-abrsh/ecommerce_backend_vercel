import { CreateProductDto } from './create-product.dto';
declare const UpdateProductDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateProductDto>>;
export declare class UpdateProductDto extends UpdateProductDto_base {
    name: string;
    description?: string;
    price: number;
    rating?: number;
    category_id: string;
    brand_id: string;
    stock_quantity?: number;
    image_url?: string;
    ram?: string;
    storage?: string;
    processor?: string;
    screen_size?: string;
    battery?: string;
    color?: string;
    model_number?: string;
    warranty?: string;
    created_by?: string;
}
export {};
