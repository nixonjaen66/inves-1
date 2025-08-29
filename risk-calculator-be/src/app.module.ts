import { Module } from '@nestjs/common';
import { LoggerModule } from './logger/logger.module';
import { HealthModule } from './health/health.module'; // 👈 ESTA es la importación
import { TestModule } from './test/test.module';  // 👈 agrega esto

@Module({
  imports: [LoggerModule, HealthModule, TestModule],  // 👈 y aquí
})
export class AppModule {}
