import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Query,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  CreateProductDto,
  CreateProductWithImageDto,
} from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '../gurads/auth.guard';
import { RolesGuard } from '../gurads/roles.gurad';
import { Roles } from '../gurads/roles.decorator';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerImageConfig } from '../config/multer.config';
import { GetProductsDto } from './dto/get-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin') // Only admin can create products
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateProductWithImageDto })
  @UseInterceptors(FileInterceptor('image', multerImageConfig))
  async createProduct(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateProductDto,
  ) {
    if (!file) throw new BadRequestException('Image file is required');
    const url = await this.productsService.uploadImage(file);
    return this.productsService.createProduct(dto, url);
  }

  @Get()
  async getProducts(@Query() query: GetProductsDto) {
    return this.productsService.getProducts({
      ...query,
      minPrice: query.minPrice ? Number(query.minPrice) : undefined,
      maxPrice: query.maxPrice ? Number(query.maxPrice) : undefined,
      rating: query.rating ? Number(query.rating) : undefined,
      page: Number(query.page) || 1,
      limit: Number(query.limit) || 10,
    });
  }
  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(id);
  }
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin') // Only admin can update products
  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin') // Only admin can delete products
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}
