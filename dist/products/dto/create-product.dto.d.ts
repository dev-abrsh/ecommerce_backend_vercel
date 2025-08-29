export declare enum CategoryEnum {
    SMARTPHONES = "Smartphones",
    LAPTOPS = "Laptops",
    TABLETS = "Tablets",
    CAMERAS = "Cameras"
}
export declare enum BrandEnum {
    APPLE = "Apple",
    SAMSUNG = "Samsung",
    DELL = "Dell",
    HP = "Hp",
    TOSHIBA = "Toshiba",
    LENOVO = "Lenvo",
    ASUS = "Asus",
    ACER = "Acer",
    SONY = "Sony",
    CANON = "Canon"
}
export declare class CreateProductDto {
    name: string;
    description?: string;
    price: number;
    rating?: number;
    category: CategoryEnum;
    brand: BrandEnum;
    stock_quantity?: number;
    image?: string;
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
export declare class CreateProductWithImageDto extends CreateProductDto {
    image: any;
}
