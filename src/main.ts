import { Logger, ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';

import { DatabaseExceptionFilter, HttpExceptionFilter } from '@common/filters';
import { AppModule } from './app.module';
import { configSwagger } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.use(helmet());
  app.use(compression());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      forbidUnknownValues: true,
    }),
  );
  app.enableVersioning();
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new DatabaseExceptionFilter(),
  );

  configSwagger(app, AppModule.apiVersion);

  await app.listen(AppModule.port);
}

bootstrap().then(() => {
  Logger.log('Application is up and running 🚀');
});
