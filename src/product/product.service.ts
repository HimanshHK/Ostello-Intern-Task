// product/product.service.ts

import { Injectable,InternalServerErrorException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    try {
      return await this.productRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving products.');
    }
  }

  async getProductById(productId: number): Promise<Product> {
    try {
      return await this.productRepository.findOneOrFail({ where: { id: productId } });
    } catch (error) {
      throw new NotFoundException(`Product with ID ${productId} not found.`);
    }
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const { name, description, price, imageURL } = createProductDto;
      const product = this.productRepository.create({
        name,
        description,
        price,
        imageURL,
      });
      return await this.productRepository.save(product);
    } catch (error) {
      throw new InternalServerErrorException('Error creating product.');
    }
  }
}

