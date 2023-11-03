import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { Poll } from './poll/poll.entity';
// import { PollService } from './poll/poll.service';
// import { PollController } from './poll/poll.controller';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { Product } from './product/product.entity';
import { Cart } from './cart/cart.entity'; // Import Cart entity
import { CartService } from './cart/cart.service'; // Import CartService
import { CartController } from './cart/cart.controller'; // Import CartController
import { CartItem } from './cart/cart-item.entity';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-cl1u1lbmgg9c73a7uq3g-a.oregon-postgres.render.com',
      port: 5432,
      username: 'poll_database_123_user',
      password: 'yUXGIq0fceuoPaea9MgvJSSZfAnhJgGe',
      database: 'poll_database_123',
      entities: [ Product, Cart,CartItem], // Include Cart and CartItem entities
      synchronize: true,
      extra: {
        ssl: true,
      },
    }),
    TypeOrmModule.forFeature([ Product, Cart,CartItem]), // Include Cart and CartItem in TypeOrmModule.forFeature
  ],
  providers: [ ProductService, CartService], // Include CartService as a provider
  controllers: [ProductController, CartController], // Include CartController in controllers
})

export class AppModule {}
