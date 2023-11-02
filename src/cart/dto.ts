export class CreateCartDto {
    userId: number;
}

export class AddProductToCartDto {
    productId: number;
    quantity: number;
}


export class UpdateCartItemQuantityDto {
    quantity: number;
}


  