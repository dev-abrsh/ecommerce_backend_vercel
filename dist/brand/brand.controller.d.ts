import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
export declare class BrandController {
    private readonly brandService;
    constructor(brandService: BrandService);
    create(dto: CreateBrandDto): Promise<import("./brand.model").Brand>;
    findAll(): Promise<import("./brand.model").Brand[]>;
    findOne(id: string): Promise<import("./brand.model").Brand>;
    update(id: string, dto: UpdateBrandDto): Promise<import("./brand.model").Brand>;
    remove(id: string): Promise<import("./brand.model").Brand>;
}
