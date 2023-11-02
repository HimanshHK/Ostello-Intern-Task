// cart.entity.ts
import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CartItem } from './cart-item.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  // Define any other fields specific to your Cart entity, such as userId

  @OneToMany(() => CartItem, cartItem => cartItem.cart, { eager: true })
  cartItems: CartItem[];
}
