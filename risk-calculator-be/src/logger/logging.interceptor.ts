import {
    CallHandler, ExecutionContext, Injectable, NestInterceptor,
  } from '@nestjs/common';
  import { Inject } from '@nestjs/common';
  import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
  import { LoggerService } from '@nestjs/common';
  import { Observable, tap } from 'rxjs';
  
  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {
    constructor(
      @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    ) {}
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const now = Date.now();
      const req = context.switchToHttp().getRequest();
      const { method, originalUrl } = req;
  
      this.logger.log(`[REQ] ${method} ${originalUrl}`);
  
      return next.handle().pipe(
        tap({
          next: () => {
            const res = context.switchToHttp().getResponse();
            const ms = Date.now() - now;
            this.logger['http']
              ? (this.logger as any).http(`[RES] ${method} ${originalUrl} ${res.statusCode} - ${ms}ms`)
              : this.logger.log(`[RES] ${method} ${originalUrl} ${res.statusCode} - ${ms}ms`);
          },
          error: (err) => {
            const ms = Date.now() - now;
            this.logger.error(
              `[ERR] ${method} ${originalUrl} - ${ms}ms - ${err?.message}`,
              err?.stack,
            );
          },
        }),
      );
    }
  }
  