import { ConsoleLogger, LoggerService, LogLevel } from '@nestjs/common';
import { dirname, join } from 'path';
import { appendFileSync, existsSync, mkdirSync } from 'fs';

export class CustomLogger implements LoggerService {
  private readonly logFile = join(process.cwd(), 'logs', 'app.log');
  private readonly consoleLogger = new ConsoleLogger();

  log(message: string, context: string) {
    this.writeLog('log', message, context);
    this.consoleLogger.log(message, context);
  }

  error(message: string, trace?: string, context?: string) {
    this.writeLog('error', message, context, trace);
    this.consoleLogger.error(message, context, trace);
  }

  warn(message: string, context: string) {
    this.writeLog('warn', message, context);
    this.consoleLogger.warn(message, context);
  }

  debug(message: string, context: string) {
    this.writeLog('debug', message, context);
    this.consoleLogger.debug(message, context);
  }

  verbose(message: string, context: string) {
    this.writeLog('verbose', message, context);
    this.consoleLogger.verbose(message, context);
  }

  private writeLog(
    level: LogLevel,
    message: string,
    context?: string,
    trace?: string,
  ) {
    const time = new Date().toISOString();
    const log = `[${time}] [${level.toUpperCase()}]${
      context ? ` [${context}]` : ''
    } ${message}${trace ? `\nTRACE: ${trace}` : ''}\n`;

    const logDir = dirname(this.logFile);
    if (!existsSync(logDir)) {
      mkdirSync(logDir, { recursive: true });
    }

    // Append log to file
    appendFileSync(this.logFile, log);
  }
}
