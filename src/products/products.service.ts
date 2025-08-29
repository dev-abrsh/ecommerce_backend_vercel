import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './products.model';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v2 as cloudinary, UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { Readable } from 'stream';
import { Types } from 'mongoose';
import { Category } from 'src/category/category.model';
import { Brand } from 'src/brand/brand.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @InjectModel(Category.name) private readonly categoryModel: Model<any>,
    @InjectModel(Brand.name) private readonly brandModel: Model<any>,
    @Inject('CLOUDINARY') private readonly cloudinary: any,
  ) {}

  async createProduct(
    createProductDto: CreateProductDto,
    imageUrl: string,
  ): Promise<Product> {
    const category = await this.categoryModel.findOne({
      name: createProductDto.category,
    });
    if (!category) {
      throw new NotFoundException(`Category "${createProductDto.category}" not found`);
    }

    const brand = await this.brandModel.findOne({
      name: createProductDto.brand,
    });
    if (!brand) {
      throw new NotFoundException(`Brand "${createProductDto.brand}" not found`);
    }

    const product = new this.productModel({
      ...createProductDto,
      category_id: category._id,
      brand_id: brand._id,
      image_url: imageUrl,
    });

    return await product.save();
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.productModel
      .find()
      .populate('category_id')
      .populate('brand_id');
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.productModel
      .findById(id)
      .populate('category_id')
      .populate('brand_id');
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async updateProduct(
    id: string,
    updateDto: UpdateProductDto,
  ): Promise<Product> {
    const updated = await this.productModel.findByIdAndUpdate(id, updateDto, {
      new: true,
    });
    if (!updated) throw new NotFoundException('Product not found');
    return updated;
  }

  async deleteProduct(id: string): Promise<void> {
    const result = await this.productModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Product not found');
  }

  async getProducts(
    filters: {
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
    } = {},
  ) {
    const query: any = {};

    // Keyword search
    if (filters.keyword) {
      query.$or = [
        { name: { $regex: filters.keyword, $options: 'i' } },
        { description: { $regex: filters.keyword, $options: 'i' } },
        { modelNumber: { $regex: filters.keyword, $options: 'i' } },
        { color: { $regex: filters.keyword, $options: 'i' } },
      ];

      // if numeric keyword -> check price
      if (!isNaN(Number(filters.keyword))) {
        query.$or.push({ price: Number(filters.keyword) });
      }
    }

    // Field-specific filters
    if (filters.name) query.name = { $regex: filters.name, $options: 'i' };
    if (filters.description)
      query.description = { $regex: filters.description, $options: 'i' };
    if (filters.category) query['category_id'] = filters.category; // use ObjectId not name
    if (filters.brand) query['brand_id'] = filters.brand; // use ObjectId not name
    if (filters.ram) query.ram = filters.ram;
    if (filters.storage) query.storage = filters.storage;
    if (filters.screenSize) query.screenSize = filters.screenSize;
    if (filters.battery) query.battery = filters.battery;
    if (filters.color) query.color = filters.color;
    if (filters.modelNumber) query.modelNumber = filters.modelNumber;
    if (filters.rating) query.rating = { $gte: filters.rating };
    if (filters.minPrice || filters.maxPrice) {
      query.price = {};
      if (filters.minPrice) query.price.$gte = filters.minPrice;
      if (filters.maxPrice) query.price.$lte = filters.maxPrice;
    }

    // Pagination
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const skip = (page - 1) * limit;

    // Sorting
    const sort: any = {};
    if (filters.sortBy) {
      sort[filters.sortBy] = filters.sortOrder === 'desc' ? -1 : 1;
    }

    // Query execution
    const results = await this.productModel
      .find(query)
      .populate('brand_id', 'name')
      .populate('category_id', 'name')
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .exec();

    const total = await this.productModel.countDocuments(query);

    return {
      data: results,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // New filter method
  async filterProducts(filters: {
    category?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
  }): Promise<Product[]> {
    const query: any = {};

    // Convert category and brand to ObjectId if they exist
    if (filters.category && Types.ObjectId.isValid(filters.category)) {
      query.category_id = new Types.ObjectId(filters.category);
    }

    if (filters.brand && Types.ObjectId.isValid(filters.brand)) {
      query.brand_id = new Types.ObjectId(filters.brand);
    }

    // Price filter
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      query.price = {};
      if (filters.minPrice !== undefined) query.price.$gte = filters.minPrice;
      if (filters.maxPrice !== undefined) query.price.$lte = filters.maxPrice;
    }

    return this.productModel
      .find(query)
      .populate('category_id')
      .populate('brand_id')
      .exec();
  }

  /**
   * Upload an image from Multer memory buffer to Cloudinary via upload_stream.
   * Returns the secure_url string.
   */
  async uploadImage(file: Express.Multer.File): Promise<string> {
    if (!file?.buffer || !file.mimetype) {
      throw new BadRequestException('Invalid image file');
    }

    const publicIdBase = this.slugBase(file.originalname);

    const secureUrl = await new Promise<string>((resolve, reject) => {
      const stream = this.cloudinary.uploader.upload_stream(
        {
          folder: 'products',
          resource_type: 'image',
          public_id: `${publicIdBase}-${Date.now()}`,
          overwrite: false,
        },
        (error: UploadApiErrorResponse, result: UploadApiResponse) => {
          if (error) return reject(new BadRequestException(error.message));
          resolve(result.secure_url);
        },
      );

      Readable.from(file.buffer).pipe(stream);
    });

    return secureUrl;
  }

  private slugBase(filename: string): string {
    const noExt = filename.replace(/\.[^/.]+$/, '');
    return noExt
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}
