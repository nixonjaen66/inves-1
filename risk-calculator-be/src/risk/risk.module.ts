import { Module } from '@nestjs/common';
import { RiskController } from './controllers/risk.controller';
import { RiskService } from './services/risk.service';

@Module({
  controllers: [RiskController],
  providers: [RiskService],
  exports: [RiskService],
})
export class RiskModule {}
