import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const swaggerFunction = (app) => {
  const config = new DocumentBuilder()
    .setTitle('Cart API')
    .setDescription('My simple cart API for E-commerce application')
    .addTag('products', 'Operations related to products') 
    .addTag('cart', 'Operations related to the shopping cart') 
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};
