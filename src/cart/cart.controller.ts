import { Controller, Post, Body, Patch, Delete, Get, Param, NotFoundException, ParseIntPipe } from '@nestjs/common'; // Added ParseIntPipe for parameter validation
import { CartService } from './cart.service';
import { CreateCartDto, AddProductToCartDto, UpdateCartItemQuantityDto } from './dto';
import { ConflictException } from '@nestjs/common';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async createCart(@Body() createCartDto: CreateCartDto) {
    
  }

  @Post('add-product')
  async addProductToCart(@Body() addProductToCartDto: AddProductToCartDto) {
    
  }

  @Patch('update-product-quantity/:cartItemId')
  async updateCartItemQuantity(
    @Param('cartItemId', ParseIntPipe) cartItemId: number, // Validate cartItemId as integer
    @Body() updateQuantityDto: UpdateCartItemQuantityDto
  ) {
    
  }

  @Delete('remove-product/:cartItemId')
  async removeProductFromCart(@Param('cartItemId', ParseIntPipe) cartItemId: number) {
    
  }

  @Get(':cartId')
  async getCartContents(@Param('cartId', ParseIntPipe) cartId: number) {

  }
}
