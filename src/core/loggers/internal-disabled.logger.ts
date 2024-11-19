import { ConsoleLogger } from '@nestjs/common';

/**
 * A custom logger that disables all logs emitted by calling `log` method if
 * they use one of the following contexts:
 * - `InstanceLoader`
 * - `RoutesResolver`
 * - `RouterExplorer`
 */
export class InternalDisabledLogger extends ConsoleLogger {
  static contextsToIgnore = [
    'InstanceLoader',
    'RoutesResolver',
    'RouterExplorer',
  ];

  log(_: any, context?: string): void {
    if (!InternalDisabledLogger.contextsToIgnore.includes(context)) {
      // eslint-disable-next-line prefer-rest-params
      super.log.apply(this, arguments);
    }
  }
}
