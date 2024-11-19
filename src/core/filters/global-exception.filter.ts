import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { MESSAGES } from '@nestjs/core/constants';
import { HttpAdapterHost } from '@nestjs/core';
import axios, { AxiosError } from 'axios';
import { Response } from 'express';

import { ERROR_CODES } from './error-codes';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | any[] = MESSAGES.UNKNOWN_EXCEPTION_MESSAGE;
    let errorCode: string | null = ERROR_CODES.UNHANDLED_EXCEPTION.code;

    if (exception instanceof HttpException) {
      ({ statusCode, message, errorCode } =
        this.handleHttpException(exception));
    } else if (axios.isAxiosError(exception)) {
      ({ statusCode, message, errorCode } =
        this.handleAxiosException(exception));
    } else {
      this.logger.error('Unhandled exception', exception as Error);
    }

    httpAdapter.reply(response, { errorCode, message }, statusCode);
  }

  private handleHttpException(exception: HttpException): {
    statusCode: number;
    message: string | any[];
    errorCode: string;
  } {
    const statusCode = exception.getStatus();
    const response = exception.getResponse() as any;
    const message = Array.isArray(response?.message)
      ? response.message
      : exception.message;
    const errorCode =
      response?.errorCode || ERROR_CODES.UNHANDLED_EXCEPTION.code;

    return { statusCode, message, errorCode };
  }

  private handleAxiosException(exception: AxiosError): {
    statusCode: number;
    message: string | any[];
    errorCode: string;
  } {
    const statusCode =
      exception.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const data = exception.response?.data as any;
    const message = data?.message || exception.message;
    const errorCode = data.errorCode || ERROR_CODES.UNHANDLED_EXCEPTION.code;

    this.logger.error(`Axios error: ${message}`, exception);

    return { statusCode, message, errorCode };
  }
}
