import { IsNumberString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateCartDto {
    userId: number;
}

export class DeleteProductFromCartDto{
    @IsNotEmpty()
    @IsInt()
    cartId: number;

    @IsNotEmpty()
    @IsInt()
    productId: number;
}

export class AddProductToCartDto {
    @IsNotEmpty()
    @IsInt()
    cartId: number;

    @IsNotEmpty()
    @IsInt()
    productId: number;

    @IsNotEmpty()
    @IsInt()
    quantity: number;

    
}
  
  
export class UpdateCartItemQuantityDto {
    quantity: number;
}