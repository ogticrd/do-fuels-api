import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

import { SwaggerConfigOptions } from './interfaces';

export const setConfiguration =
  (versions: SwaggerConfigOptions[]) => (app: INestApplication) => {
    const title = 'Fuels API';
    const description = 'API Documentation';

    versions.forEach((config) => {
      const options = new DocumentBuilder()
        .setTitle(title)
        .setDescription(description)
        .setVersion(config.version)
        .build();

      const document = SwaggerModule.createDocument(app, options, {
        operationIdFactory: (controllerKey: string, methodKey: string) =>
          methodKey,
        include: config.modules,
      });

      SwaggerModule.setup(`${config.version}/swagger`, app, document, {
        swaggerOptions: {
          defaultModelsExpandDepth: -1,
        },
      });
    });
  };
