import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductsDto } from './dto/get-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    createProduct(file: Express.Multer.File, dto: CreateProductDto): Promise<import("./products.model").Product>;
    getProducts(query: GetProductsDto): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./products.model").Product, {}> & import("./products.model").Product & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getProductById(id: string): Promise<import("./products.model").Product>;
    updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<import("./products.model").Product>;
    deleteProduct(id: string): Promise<void>;
}
