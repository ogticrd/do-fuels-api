import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { ConnectionOptions } from 'typeorm';

import { Environmnet } from '@common/enums';

export const PostgresProvider: DynamicModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  async useFactory(config: ConfigService) {
    const isDevelopment = config.get('NODE_ENV') !== Environmnet.Production;

    return {
      type: 'postgres',
      host: config.get('DB_HOST'),
      username: config.get('DB_USER'),
      password: config.get('DB_PASSWORD'),
      port: +config.get('DB_PORT'),
      database: config.get('DB_NAME'),
      synchronize: isDevelopment,
      autoLoadEntities: true,
      logging: config.get('DB_LOGGING'),
    } as ConnectionOptions;
  },
});
