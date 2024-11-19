import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { HealthCheckController } from './healthcheck.controller';

@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [HealthCheckController],
})
export class HealthcheckModule {}
