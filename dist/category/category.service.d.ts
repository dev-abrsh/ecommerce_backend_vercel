import { Model } from 'mongoose';
import { Category } from './category.model';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoryService {
    private readonly categoryModel;
    constructor(categoryModel: Model<Category>);
    createCategory(dto: CreateCategoryDto): Promise<Category>;
    getAll(): Promise<Category[]>;
    getOne(id: string): Promise<Category>;
    updateCategory(id: string, dto: UpdateCategoryDto): Promise<Category>;
    remove(id: string): Promise<void>;
}
