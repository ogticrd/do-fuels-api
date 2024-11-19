import { applyDecorators, UseInterceptors } from '@nestjs/common';

import { TransformInterceptor } from '../interceptors';

export function Serializer(classType: any) {
  if (Array.isArray(classType)) {
    classType = classType.at(0);
  }

  return applyDecorators(UseInterceptors(new TransformInterceptor(classType)));
}
