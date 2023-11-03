import { Entity, PrimaryGeneratedColumn, OneToMany,Column } from 'typeorm';
import { CartItem } from './cart-item.entity'; // Import CartItem entity
// import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'jsonb', nullable: true, default: [] })
  cartItems: CartItem[];
}

