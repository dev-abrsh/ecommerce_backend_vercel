"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductWithImageDto = exports.CreateProductDto = exports.BrandEnum = exports.CategoryEnum = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
var CategoryEnum;
(function (CategoryEnum) {
    CategoryEnum["SMARTPHONES"] = "Smartphones";
    CategoryEnum["LAPTOPS"] = "Laptops";
    CategoryEnum["TABLETS"] = "Tablets";
    CategoryEnum["CAMERAS"] = "Cameras";
})(CategoryEnum || (exports.CategoryEnum = CategoryEnum = {}));
var BrandEnum;
(function (BrandEnum) {
    BrandEnum["APPLE"] = "Apple";
    BrandEnum["SAMSUNG"] = "Samsung";
    BrandEnum["DELL"] = "Dell";
    BrandEnum["HP"] = "Hp";
    BrandEnum["TOSHIBA"] = "Toshiba";
    BrandEnum["LENOVO"] = "Lenvo";
    BrandEnum["ASUS"] = "Asus";
    BrandEnum["ACER"] = "Acer";
    BrandEnum["SONY"] = "Sony";
    BrandEnum["CANON"] = "Canon";
})(BrandEnum || (exports.BrandEnum = BrandEnum = {}));
class CreateProductDto {
    name;
    description;
    price;
    rating;
    category;
    brand;
    stock_quantity;
    image;
    ram;
    storage;
    processor;
    screen_size;
    battery;
    color;
    model_number;
    warranty;
    created_by;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, description: { required: false, type: () => String }, price: { required: true, type: () => Number }, rating: { required: false, type: () => Number }, category: { required: true, enum: require("./create-product.dto").CategoryEnum }, brand: { required: true, enum: require("./create-product.dto").BrandEnum }, stock_quantity: { required: false, type: () => Number }, image: { required: false, type: () => String }, ram: { required: false, type: () => String }, storage: { required: false, type: () => String }, processor: { required: false, type: () => String }, screen_size: { required: false, type: () => String }, battery: { required: false, type: () => String }, color: { required: false, type: () => String }, model_number: { required: false, type: () => String }, warranty: { required: false, type: () => String }, created_by: { required: false, type: () => String } };
    }
}
exports.CreateProductDto = CreateProductDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "price", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "rating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: CategoryEnum }),
    (0, class_validator_1.IsEnum)(CategoryEnum),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: BrandEnum }),
    (0, class_validator_1.IsEnum)(BrandEnum),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "brand", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "stock_quantity", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "image", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "ram", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "storage", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "processor", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "screen_size", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "battery", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "color", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "model_number", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "warranty", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "created_by", void 0);
class CreateProductWithImageDto extends CreateProductDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { image: { required: true, type: () => Object } };
    }
}
exports.CreateProductWithImageDto = CreateProductWithImageDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary', required: false }),
    __metadata("design:type", Object)
], CreateProductWithImageDto.prototype, "image", void 0);
//# sourceMappingURL=create-product.dto.js.map