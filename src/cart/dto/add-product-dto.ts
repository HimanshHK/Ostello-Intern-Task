import { IsNotEmpty, IsInt } from 'class-validator';

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