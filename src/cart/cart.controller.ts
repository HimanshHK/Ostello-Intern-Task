import { Controller, Post, Body, Get, Param,Res,HttpStatus } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddProductToCartDto } from './dto/add-product-dto';
import { DeleteProductFromCartDto } from './dto/delete-product-dto';
import { ApiOperation, ApiTags, ApiParam,ApiBody,ApiResponse  } from '@nestjs/swagger';
import { Cart } from './cart.entity';
import { CartItem } from './cart-item.entity';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new cart', description: 'Creates a new shopping cart.' })
  @ApiResponse({ status: 201, description: 'Cart created successfully' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async createCart(@Res() response): Promise<void> {
    try {
      const cart: Cart = await this.cartService.createCart();
      response.status(HttpStatus.CREATED).json({ message: 'Cart created successfully', data: cart });
    } catch (error) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error', message: error.message });
    }
  }

  @Get(':cartId')
  @ApiOperation({ 
    summary: 'Get cart contents', 
    description: 'Retrieve cart items based on the provided cart ID.' 
  })
  @ApiParam({ name: 'cartId', description: 'ID of the cart to retrieve items from', type: 'number' })
  @ApiResponse({ status: 200, description: 'Cart items retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Cart not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async getCartContents(@Param('cartId') cartId: number, @Res() response): Promise<void> {
    try {
      const cartItems: CartItem[] = await this.cartService.getCartContents(cartId);
      if (cartItems) {
        response.status(HttpStatus.OK).json({ message: 'Cart items retrieved successfully', data: cartItems });
      } else {
        response.status(HttpStatus.NOT_FOUND).json({ error: 'Cart not found', message: `Cart with ID ${cartId} not found` });
      }
    } catch (error) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error', message: error.message });
    }
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
