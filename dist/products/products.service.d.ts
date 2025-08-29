import { Product } from './products.model';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Types } from 'mongoose';
export declare class ProductsService {
    private readonly productModel;
    private readonly categoryModel;
    private readonly brandModel;
    private readonly cloudinary;
    constructor(productModel: Model<Product>, categoryModel: Model<any>, brandModel: Model<any>, cloudinary: any);
    createProduct(createProductDto: CreateProductDto, imageUrl: string): Promise<Product>;
    getAllProducts(): Promise<Product[]>;
    getProductById(id: string): Promise<Product>;
    updateProduct(id: string, updateDto: UpdateProductDto): Promise<Product>;
    deleteProduct(id: string): Promise<void>;
    getProducts(filters?: {
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
        page?: number;
        limit?: number;
        sortBy?: string;
        sortOrder?: 'asc' | 'desc';
    }): Promise<{
        data: (import("mongoose").Document<unknown, {}, Product, {}> & Product & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    filterProducts(filters: {
        category?: string;
        brand?: string;
        minPrice?: number;
        maxPrice?: number;
    }): Promise<Product[]>;
    uploadImage(file: Express.Multer.File): Promise<string>;
    private slugBase;
}
