import { Module } from '@nestjs/common';
import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

const { combine, timestamp, errors, json, colorize } = winston.format;

const dailyRotateInfo = new (winston.transports as any).DailyRotateFile({
  dirname: 'logs',
  filename: 'app-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '10m',
  maxFiles: '14d',
  level: 'info',
  format: combine(timestamp(), json()),
});

const dailyRotateError = new (winston.transports as any).DailyRotateFile({
  dirname: 'logs',
  filename: 'error-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '10m',
  maxFiles: '30d',
  level: 'error',
  format: combine(timestamp(), json()),
});

@Module({
  imports: [
    WinstonModule.forRoot({
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
      transports: [
        // Consola “amigable” para dev
        new winston.transports.Console({
          format: combine(
            timestamp(),
            errors({ stack: true }),
            colorize({ all: true }),
            nestWinstonModuleUtilities.format.nestLike('API', {
              colors: true,
              prettyPrint: true,
            }),
          ),
        }),
        // Archivos rotados (JSON)
        dailyRotateInfo,
        dailyRotateError,
      ],
      // Mapea 'http' como nivel válido para morgan
      levels: { error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6 },
    }),
  ],
  exports: [WinstonModule],
})
export class LoggerModule {}
