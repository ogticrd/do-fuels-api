import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

export const PostgresProvider = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    type: 'postgres',
    host: config.get('POSTGRES_HOST'),
    username: config.get('POSTGRES_USER'),
    password: config.get('POSTGRES_PASSWORD'),
    port: +config.get('POSTGRES_PORT'),
    database: config.get('POSTGRES_DB'),
    autoLoadEntities: true,
  }),
});
