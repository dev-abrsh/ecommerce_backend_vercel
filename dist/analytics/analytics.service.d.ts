import { Model } from 'mongoose';
import { Order } from '../order/order.model';
import { Product } from 'src/products/products.model';
import { Brand } from '../brand/brand.model';
import { Category } from '../category/category.model';
export declare class AnalyticsService {
    private orderModel;
    private productModel;
    private categoryModel;
    private brandModel;
    constructor(orderModel: Model<Order>, productModel: Model<Product>, categoryModel: Model<Category>, brandModel: Model<Brand>);
    productsPerCategory(): Promise<any[]>;
    productsPerBrand(): Promise<any[]>;
    totalSalesPerProduct(): Promise<any[]>;
}
