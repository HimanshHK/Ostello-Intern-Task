import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process'; // Import process correctly
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Cart API')
    .setDescription('My simple cart API for E-commerce application')
    .addTag('products', 'Operations related to products') // Add tags for grouping endpoints
    .addTag('cart', 'Operations related to the shopping cart') // Add cart tag
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT || 3000, '0.0.0.0'); // Use the correct syntax for environment variable and host binding
}
bootstrap();

