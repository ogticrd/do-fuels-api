import { SwaggerConfigOptions } from './interfaces';
import { setConfiguration } from './swagger.config';
import modules from '@v1/modules';

const versions: SwaggerConfigOptions[] = [
  {
    version: 'v1',
    modules,
  },
];

export const useSwagger = setConfiguration(versions);
export * from './interfaces';
