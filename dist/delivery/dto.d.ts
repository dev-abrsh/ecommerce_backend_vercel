export declare class CreateDeliveryDto {
    order_id: string;
    street_add: string;
    street_add2?: string;
    city: string;
    state: string;
    home_no?: string;
}
declare const UpdateDeliveryDto_base: import("@nestjs/common").Type<Partial<CreateDeliveryDto>>;
export declare class UpdateDeliveryDto extends UpdateDeliveryDto_base {
}
export {};
