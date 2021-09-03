import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { FuelsModule } from '@modules/fuels/fuels.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    FuelsModule,
  ],
})
export class AppModule {
  static port: number;
  static apiVersion: string;

  constructor(private readonly configService: ConfigService) {
    AppModule.port = +this.configService.get('PORT');
    AppModule.apiVersion = this.configService.get('API_VERSION');
  }
}
