import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
// import { CartItem } from './cart-item.entity';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

}
