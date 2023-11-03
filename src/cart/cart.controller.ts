import { Controller, Post, Body, Get, Param,Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddProductToCartDto } from './dto';
import { DeleteProductFromCartDto } from './dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async createCart() {
    const cart = await this.cartService.createCart();
    return cart;
  }

  @Get(':cartId')
  async getCartContents(@Param('cartId') cartId: number) {
    const cartItems = await this.cartService.getCartContents(cartId);
    return cartItems;
  }

  @Post(':cartId/add-product')
  async addProductToCart(@Param('cartId') cartId: number, @Body() dto: AddProductToCartDto) {
    const cartItem = await this.cartService.addProductToCart({ ...dto, cartId });
    return cartItem;
  }

  @Post(':cartId/delete-product')
  async deleteProductFromCart(@Param('cartId') cartId: number, @Body() dto: DeleteProductFromCartDto) {
    const cartItem = await this.cartService.deleteProductFromCart({ ...dto, cartId });
    return cartItem;
  }

}
