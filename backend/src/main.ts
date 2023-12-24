import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import SwaggerSetup from './swagger.setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  SwaggerSetup.apply(app);

  await app.listen(4000);
}
bootstrap();
