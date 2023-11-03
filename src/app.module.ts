import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { Product } from './product/product.entity';
import { Cart } from './cart/cart.entity';
import { CartService } from './cart/cart.service';
import { CartController } from './cart/cart.controller';
import { CartItem } from './cart/cart-item.entity';
import { Auth } from './auth/auth.entity';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOSTNAME,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Product, Cart, CartItem,Auth],
      synchronize: true,
      extra: {
        ssl: true,
      },
    }),
    TypeOrmModule.forFeature([Product, Cart, CartItem,Auth]),
  ],
  providers: [ProductService, CartService, AppService,AuthService],
  controllers: [ProductController, CartController, AppController,AuthController],
})


export class AppModule {}
