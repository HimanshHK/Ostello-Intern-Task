import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CartItem } from './cart-item.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'jsonb', nullable: true, default: [] })
  cartItems: CartItem[];
}

