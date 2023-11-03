import { Entity, PrimaryGeneratedColumn,  Column } from 'typeorm';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;
  

  @Column()
  productId:number;
}

