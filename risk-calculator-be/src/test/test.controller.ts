import { Controller, Get, Inject, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Controller('test')
export class TestController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
  ) {}

  @Get()
  hello() {
    this.logger.log('📢 Hola desde Winston!');
    this.logger.warn('⚠️ Advertencia de prueba');
    this.logger.error('❌ Error de prueba', new Error().stack);
    return { ok: true };
  }
}
