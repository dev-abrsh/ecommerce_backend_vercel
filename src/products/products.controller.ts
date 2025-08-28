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
import { AuthGuard } from 'src/gurads/auth.guard';
import { RolesGuard } from 'src/gurads/roles.gurad';
import { Roles } from 'src/gurads/roles.decorator';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerImageConfig } from 'src/config/multer.config';

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
async getProducts(
  @Query('keyword') keyword?: string,
  @Query('name') name?: string,
  @Query('description') description?: string,
  @Query('minPrice') minPrice?: string,
  @Query('maxPrice') maxPrice?: string,
  @Query('rating') rating?: string,
  @Query('category') category?: string,
  @Query('brand') brand?: string,
  @Query('ram') ram?: string,
  @Query('storage') storage?: string,
  @Query('screenSize') screenSize?: string,
  @Query('battery') battery?: string,
  @Query('color') color?: string,
  @Query('modelNumber') modelNumber?: string,
  @Query('page') page: string = '1',
  @Query('limit') limit: string = '10',
  @Query('sortBy') sortBy?: string,
  @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'asc',
) {
  return this.productsService.getProducts({
    keyword,
    name,
    description,
    minPrice: minPrice ? parseFloat(minPrice) : undefined,
    maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
    rating: rating ? parseFloat(rating) : undefined,
    category,
    brand,
    ram,
    storage,
    screenSize,
    battery,
    color,
    modelNumber,
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    sortBy,
    sortOrder,
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
