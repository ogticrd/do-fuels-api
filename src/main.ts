import {
  INestApplication,
  Logger,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import helmet from 'helmet';


import { DatabaseExceptionFilter, GlobalExceptionFilter } from '@core/filters';
import { InternalDisabledLogger } from '@core/loggers';
import { useSwagger } from '@core/swagger';
import { AppModule } from './app.module';

class Application {
  private app: INestApplication;
  private logger = new Logger('NestApplication');

  async init(): Promise<void> {
    this.app = await NestFactory.create(AppModule, {
      logger: new InternalDisabledLogger(),
    });

    this.setupVersioning();
    this.setupGlobalFilters();
    this.setupGlobalPipes();
    this.setupSwagger();
    this.app.enableShutdownHooks();
    this.app.use(helmet());
    this.app.use(compression());

    const server = await this.app.listen(AppModule.port);
    this.logger.log(`API is running on: ${await this.app.getUrl()}`);
    this.logger.log(
      `See the API docs on: ${await this.app.getUrl()}/v1/swagger`,
    );

    this.handleTerminationSignals(server);
  }

  private setupVersioning(): void {
    this.app.enableVersioning({
      type: VersioningType.URI,
    });
  }

  private setupGlobalFilters(): void {
    const httpAdapterHost = this.app.get(HttpAdapterHost);
    this.app.useGlobalFilters(
      new GlobalExceptionFilter(httpAdapterHost),
      new DatabaseExceptionFilter(),
    );
  }

  private setupGlobalPipes(): void {
    this.app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: {
          exposeUnsetFields: false,
          enableImplicitConversion: true,
        },
      }),
    );
  }

  private setupSwagger(): void {
    useSwagger(this.app);
  }

  private handleTerminationSignals(server: any): void {
    process.stdin.resume();

    const handleTermination = () => {
      server.close((err: any) => {
        if (err) {
          this.logger.error('Server is shutting down', err);
          process.exit(1);
        } else {
          this.logger.warn('Server closed gracefully');
          process.exit(0);
        }
      });
    };

    process.on('SIGINT', handleTermination);
    process.on('SIGTERM', handleTermination);
  }
}

(async () => {
  const application = new Application();
  await application.init();
})();
