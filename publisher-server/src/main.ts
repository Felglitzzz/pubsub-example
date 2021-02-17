import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './config';
import { ErrorsInterceptor } from './interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ErrorsInterceptor());
  await app.listen(config.port);
  console.info(`Alpha Server running on ${config.port}`);
}
bootstrap();
