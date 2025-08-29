import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  ping() {
    return {
      ok: true,
      service: 'risk-calculator',
      timestamp: new Date().toISOString(),
    };
  }
}
