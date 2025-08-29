// src/main.ts
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';

// ✅ usa default import con helmet
import helmet from 'helmet';

// ✅ usa namespace imports con estos (evita el “is not a function”)
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const logger = app.get<LoggerService>(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);

  // Seguridad y middlewares
  app.use(helmet());
  app.use(compression());   // ✅ funciona
  app.use(cookieParser());  // ✅ funciona

  // CORS para frontend
  app.enableCors({
    origin: process.env.FRONTEND_URL?.split(',') || ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type', 'Authorization', 'Accept',
      'X-Requested-With', 'X-Forwarded-For', 'X-Request-Id',
    ],
    exposedHeaders: ['X-Request-Id'],
  });

  // Logs de acceso
  app.use(
    morgan('combined', {
      stream: {
        write: (message) => {
          const msg = message.trim();
          (logger as any)?.http ? (logger as any).http(msg) : logger.log(msg);
        },
      },
    }),
  );

  // Validaciones globales
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // Prefijo de rutas
  app.setGlobalPrefix('api/v1');
  app.enableShutdownHooks();

  const port = Number(process.env.PORT) || 4000;
  await app.listen(port);

  const baseUrl = `http://localhost:${port}`;
  logger.log(`🚀 API levantada: ${baseUrl}`);
  logger.log(`🔌 Prefijo global: /api/v1`);
}

bootstrap().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('❌ Error al iniciar la app:', err);
  process.exit(1);
});
