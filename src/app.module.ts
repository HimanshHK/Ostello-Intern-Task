import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Poll } from './poll/poll.entity';
import { PollService } from './poll/poll.service';
import { PollController } from './poll/poll.controller';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { Product } from './product/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-cl1u1lbmgg9c73a7uq3g-a.oregon-postgres.render.com',
      port: 5432,
      username: 'poll_database_123_user',
      password: 'yUXGIq0fceuoPaea9MgvJSSZfAnhJgGe',
      database: 'poll_database_123',
      entities: [Poll, Product],
      synchronize: true,
      extra: {
        ssl: true, // Enable SSL
      },
    }),
    TypeOrmModule.forFeature([Poll,Product]),
  ],
  providers: [PollService,ProductService],
  controllers: [PollController,ProductController],
})



export class AppModule {}
