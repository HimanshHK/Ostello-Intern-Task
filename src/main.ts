import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process'; // Import process correctly

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000, '0.0.0.0'); // Use the correct syntax for environment variable and host binding
}
bootstrap();

