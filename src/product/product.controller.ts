import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiTags, ApiResponse,ApiBody } from '@nestjs/swagger';

@ApiTags('products') 
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'List of products.' })
  async getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @Get(':productId')
  @ApiResponse({ status: 200, description: 'Product found.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async getProductById(@Param('productId') productId: number): Promise<Product> {
    try {
      return await this.productService.getProductById(productId);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Product created.' }) 
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiBody({ type: CreateProductDto }) 
  async createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.createProduct(createProductDto);
  }
}

