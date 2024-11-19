import { CacheModuleOptions } from '@nestjs/cache-manager';

export const cacheOptions: CacheModuleOptions = { ttl: 1000 * 60 * 10 };
