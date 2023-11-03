import { Injectable,InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './cart-item.entity';
import { Cart } from './cart.entity';
import { NotFoundException } from '@nestjs/common';
import { AddProductToCartDto } from './dto/add-product-dto';
import { DeleteProductFromCartDto } from './dto/delete-product-dto';


@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {}

  async createCart(): Promise<Cart> {
    try {
      const cart = new Cart();
      cart.cartItems = [];
      return await this.cartRepository.save(cart);
    } catch (error) {
      throw new InternalServerErrorException('Error creating cart.');
    }
  }

  async getCartContents(cartId: number): Promise<CartItem[]> {
    try {
      const cart = await this.cartRepository.findOne({
        where: { id: cartId },
      });

      if (!cart) {
        throw new NotFoundException('Cart not found');
      }

      return cart.cartItems;
    } catch (error) {
      throw new NotFoundException('Error finding cart contents.');
    }
  }


  async addProductToCart(dto: AddProductToCartDto): Promise<Cart> {
    
    try{ 
    const { cartId, productId, quantity } = dto;
    
      const cart = await this.cartRepository.findOne(
        {
          where: { id: cartId }, 
        }
      );
    
      if (!cart) {
        throw new NotFoundException('Cart not found');
      }

      const existingCartItem = cart.cartItems.find(item => item.productId === productId);
    
      if (existingCartItem) {
        existingCartItem.quantity += quantity;
      } else {
        const newCartItem = new CartItem();
        newCartItem.productId = productId;
        newCartItem.quantity = quantity;
        cart.cartItems.push(newCartItem);
      }

      await this.cartRepository.save(cart);
    
      return cart;
    } catch (error) {
      throw new InternalServerErrorException('Error adding product to cart.');
    }
  }


  async deleteProductFromCart(dto: DeleteProductFromCartDto): Promise<Cart> {
    try{  
      const { cartId, productId } = dto;
      const cart = await this.cartRepository.findOne(
        {
          where: { id: cartId },
        }
      );
    
      if (!cart) {
        throw new NotFoundException('Cart not found');
      }
    
      const existingCartItem = cart.cartItems.find(item => item.productId === productId);
      console.log(existingCartItem)
      if (existingCartItem) {
        const index = cart.cartItems.indexOf(existingCartItem);
        if (index !== -1) {
          cart.cartItems.splice(index, 1);
        }
    
        await this.cartRepository.save(cart);
      }
    
      return cart;
    } catch (error) {
      throw new InternalServerErrorException('Error adding product to cart.');
    }
  }
  
  
  
}
