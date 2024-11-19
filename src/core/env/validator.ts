import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { Logger } from '@nestjs/common';

type Class<T> = new (...args: unknown[]) => T;

export function createValidator<T extends object>(validationClass: Class<T>) {
  return function (config: Record<string, unknown>): T {
    const logger = new Logger('EnvironmentValidator');

    const validatedConfig = plainToClass(validationClass, config, {
      enableImplicitConversion: true,
      exposeDefaultValues: true,
    });

    const errors = validateSync(validatedConfig, {
      skipMissingProperties: false,
    });

    if (errors.length) {
      logValidationErrors(errors, logger);
      throw new Error('Invalid environment configuration');
    }

    return validatedConfig;
  };
}

function logValidationErrors(errors: any[], logger: Logger): void {
  for (const error of errors) {
    for (const constraint of Object.values(error.constraints)) {
      logger.error(constraint);
    }
  }
}
