import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ErrorsInterceptor } from './interceptors';
import { config } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ErrorsInterceptor());


  const docConfig = new DocumentBuilder()
    .setTitle('Publisher Server Documentation')
    .setDescription('API Documentation for Publisher Server')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, docConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(config.port);
  console.info(`Publisher Server running on ${config.port}`);
}
bootstrap();
