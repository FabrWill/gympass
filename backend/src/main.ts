import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiConfigService } from './config/api_config.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.enableCors({
    credentials: true,
    origin: '*',
    allowedHeaders: '*',
  });

  app.setGlobalPrefix('api');

  const configService = app.get(ApiConfigService);
  await app.listen(configService.port);
}
bootstrap();
