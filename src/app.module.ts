import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { EnvironmentSchema, validate } from '@core/env';
import { V1Module } from '@v1/v1.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, validate }), V1Module],
})
export class AppModule {
  static port: number;

  constructor(
    private readonly configService: ConfigService<EnvironmentSchema>,
  ) {
    AppModule.port = this.configService.get('PORT');
  }
}
