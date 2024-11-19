import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { Response } from 'express';

import { ERROR_CODES, POSTGRES_ERROR_CODES } from './error-codes';

@Catch(QueryFailedError)
export class DatabaseExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(DatabaseExceptionFilter.name);

  catch(err: QueryFailedError, host: ArgumentsHost): Response {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const code = (err as any).code;

    let errorCode = ERROR_CODES.UNHANDLED_DB_EXCEPTION.code;
    const status = HttpStatus.CONFLICT;
    let { message } = err;

    if (code === POSTGRES_ERROR_CODES.UNIQUE_VIOLATION) {
      errorCode = ERROR_CODES.RESOURCE_ALREADY_EXISTS_EXCEPTION.code;
      message = ERROR_CODES.RESOURCE_ALREADY_EXISTS_EXCEPTION.message;
    }

    this.logger.error(message);

    return response.status(status).json({
      message,
      errorCode,
    });
  }
}
