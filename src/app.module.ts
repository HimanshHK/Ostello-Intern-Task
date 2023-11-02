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
      host: 'localhost',
      port: 5432,
      username: 'poll_user',
      password: 'poll_password',
      database: 'poll_db',
      entities: [Poll,Product],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Poll,Product]),
  ],
  providers: [PollService,ProductService],
  controllers: [PollController,ProductController],
})



export class AppModule {}
