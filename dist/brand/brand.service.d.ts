import { Model } from 'mongoose';
import { Brand } from './brand.model';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
export declare class BrandService {
    private brandModel;
    constructor(brandModel: Model<Brand>);
    create(createBrandDto: CreateBrandDto): Promise<Brand>;
    findAll(): Promise<Brand[]>;
    findOne(id: string): Promise<Brand>;
    update(id: string, updateBrandDto: UpdateBrandDto): Promise<Brand>;
    remove(id: string): Promise<Brand>;
}
