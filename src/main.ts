import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process'; 
import { swaggerFunction } from './installations/swagger'; 


async function bootstrap() { 
  const app = await NestFactory.create(AppModule);
  swaggerFunction(app); 
  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}

bootstrap();
