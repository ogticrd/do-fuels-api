import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

const title = 'Dominican Fuels prices API';
const description =
  'This API expose the dominican fuel prices from 2010 to date.';

/**
 * Setup swagger in the application boostrap
 * @param app {INestApplication}
 */
export const configSwagger = (app: INestApplication, apiVersion: string) => {
  const options = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(apiVersion)
    .setContact('OGTIC', 'https://ogtic.gob.do', 'info@ogtic.gob.do')
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  });

  SwaggerModule.setup(`${apiVersion}/fuels/api`, app, document);
};
