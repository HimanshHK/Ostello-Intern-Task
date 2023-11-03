import { IsNotEmpty, IsInt } from 'class-validator';

export class DeleteProductFromCartDto{
    @IsNotEmpty()
    @IsInt()
    cartId: number;

    @IsNotEmpty()
    @IsInt()
    productId: number;
}