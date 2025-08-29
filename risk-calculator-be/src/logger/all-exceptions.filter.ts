import {
    ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus,
  } from '@nestjs/common';
  import { Inject } from '@nestjs/common';
    import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
  import { LoggerService } from '@nestjs/common';
  
  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
    constructor(
      @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    ) {}
  
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const res = ctx.getResponse();
      const req = ctx.getRequest();
  
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
  
      const message =
        exception instanceof HttpException
          ? exception.message
          : 'Internal server error';
  
      this.logger.error(
        `[EXC] ${req.method} ${req.originalUrl} -> ${status} | ${message}`,
        (exception as any)?.stack,
      );
  
      res.status(status).json({
        statusCode: status,
        message,
        path: req.originalUrl,
        timestamp: new Date().toISOString(),
      });
    }
  }
  