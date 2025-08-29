import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(dto: CreateCategoryDto): Promise<import("./category.model").Category>;
    findAll(): Promise<import("./category.model").Category[]>;
    update(id: string, dto: UpdateCategoryDto): Promise<import("./category.model").Category>;
    findOne(id: string): Promise<import("./category.model").Category>;
    remove(id: string): Promise<void>;
}
