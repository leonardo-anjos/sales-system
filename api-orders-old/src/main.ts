import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // security middlewares
  app.enableCors();
  app.use(helmet());

  // validation
  app.useGlobalPipes(new ValidationPipe({ disableErrorMessages: false }));

  await app.listen(process.env.API_PORT || 3002);
}
bootstrap();
