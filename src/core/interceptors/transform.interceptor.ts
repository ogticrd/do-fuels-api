import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { plainToClass } from 'class-transformer';
import { Paginated } from 'nestjs-paginate';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface Response<T> {
  new (): T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<Partial<T>, T> {
  constructor(
    private readonly classType: Response<T>,
    private readonly isPaginated: boolean = false,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<Partial<T>>,
  ): Observable<T> {
    const response: ExpressResponse = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data: Partial<T>) => {
        if (this.isPaginated && this.isPaginatedResponse(data)) {
          this.setPaginationHeaders(response, data.meta);
          data = data.data as unknown as Partial<T>;
        }

        return plainToClass(this.classType, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }

  private isPaginatedResponse(
    data: Partial<T> | Paginated<Partial<T>>,
  ): data is Paginated<Partial<T>> {
    return (data as Paginated<Partial<T>>).meta !== undefined;
  }

  private setPaginationHeaders(
    response: ExpressResponse,
    meta: Paginated<Partial<T>>['meta'],
  ): void {
    response.setHeader('x-current-page', meta.currentPage);
    response.setHeader('x-total-count', meta.totalItems);
    response.setHeader('x-total-pages', meta.totalPages);
    response.setHeader('x-per-page', meta.itemsPerPage);
  }
}
