import { Controller, Post, Body, Get, Param,Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddProductToCartDto } from './dto/add-product-dto';
import { DeleteProductFromCartDto } from './dto/delete-product-dto';
import { ApiOperation, ApiTags, ApiParam,ApiBody  } from '@nestjs/swagger';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new cart', description: 'Creates a new shopping cart.' })
  async createCart() {
    const cart = await this.cartService.createCart();
    return cart;
  }

  @Get(':cartId')
  @ApiOperation({ 
    summary: 'Get cart contents', 
    description: 'Retrieve cart items based on the provided cart ID.' 
  })
  @ApiParam({ name: 'cartId', description: 'ID of the cart to retrieve items from', type: 'number' })
  async getCartContents(@Param('cartId') cartId: number) {
    const cartItems = await this.cartService.getCartContents(cartId);
    return cartItems;
  }

  @Post(':cartId/add-product')
  @ApiOperation({ 
    summary: 'Add product to cart', 
    description: 'Add a new product to the cart specified by the provided cart ID.' 
  })
  @ApiParam({ name: 'cartId', description: 'ID of the cart to add the product to', type: 'number' })
  @ApiBody({ type: AddProductToCartDto }) 
  async addProductToCart(@Param('cartId') cartId: number, @Body() dto: AddProductToCartDto) {
    const cartItem = await this.cartService.addProductToCart({ ...dto, cartId });
    return cartItem;
  }

  @Post(':cartId/delete-product')
  @ApiOperation({ 
    summary: 'Delete product from cart', 
    description: 'Delete a product from the cart specified by the provided cart ID.' 
  })
  @ApiParam({ name: 'cartId', description: 'ID of the cart to remove the product from', type: 'number' })
  @ApiBody({ type: DeleteProductFromCartDto }) 
  async deleteProductFromCart(@Param('cartId') cartId: number, @Body() dto: DeleteProductFromCartDto) {
    const cartItem = await this.cartService.deleteProductFromCart({ ...dto, cartId });
    return cartItem;
  }

}
