import { Controller, Get, Post, Body, Param, NotFoundException,Res,HttpStatus } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiTags, ApiResponse,ApiBody,ApiOperation } from '@nestjs/swagger';

@ApiTags('products') 
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products', description: 'Retrieve a list of all products.' })
  @ApiResponse({ status: 200, description: 'List of products.', type: Product, isArray: true })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async getAllProducts(@Res() response): Promise<void> {
    try {
      const products: Product[] = await this.productService.getAllProducts();
      response.status(HttpStatus.OK).json(products);
    } catch (error) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error', message: error.message });
    }
  }

  @Get(':productId')
  @ApiOperation({ summary: 'Get product by ID', description: 'Retrieve a product by its ID.' })
  @ApiResponse({ status: 200, description: 'Product found.', type: Product })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async getProductById(@Param('productId') productId: number, @Res() response): Promise<void> {
    try {
      const product: Product = await this.productService.getProductById(productId);
      if (product) {
        response.status(HttpStatus.OK).json(product);
      } else {
        response.status(HttpStatus.NOT_FOUND).json({ message: 'Product not found.' });
      }
    } catch (error) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error', message: error.message });
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a new product', description: 'Creates a new product.' })
  @ApiResponse({ status: 201, description: 'Product created.', type: Product })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async createProduct(@Body() createProductDto: CreateProductDto, @Res() response): Promise<void> {
    try {
      const product: Product = await this.productService.createProduct(createProductDto);
      response.status(HttpStatus.CREATED).json(product);
    } catch (error) {
      response.status(HttpStatus.BAD_REQUEST).json({ error: 'Bad Request', message: error.message });
    }
  }
}

