import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { RiskService } from '../services/risk.service';
import { RiskRequestDto } from '../dto/risk-request.dto';
import { RiskOutputDto } from '../dto/risk-output.dto';
import { RiskInput, RiskConfig } from '../types/risk.types';

@Controller('risk')
export class RiskController {
  constructor(private readonly riskService: RiskService) {}

  /**
   * Calculates financial risk based on input parameters
   * @param requestBody - The request body containing input and optional config
   * @returns RiskOutput with calculated score, category and explanation
   */
  @Post('calculate')
  @HttpCode(HttpStatus.OK)
  public calculateRisk(
    @Body() requestBody: RiskRequestDto,
  ): RiskOutputDto {
    const input: RiskInput = {
      vulnerabilidades: requestBody.vulnerabilidades,
      amenazas: requestBody.amenazas,
      impacto: requestBody.impacto,
      mitigacion: requestBody.mitigacion,
    };

    const config: RiskConfig | undefined = requestBody.config
      ? {
          thresholds: requestBody.config.thresholds,
          weights: requestBody.config.weights,
        }
      : undefined;

    const result = this.riskService.calculateRisk(input, config);

    return {
      score: result.score,
      category: result.category,
      explanation: result.explanation,
    };
  }

  /**
   * Health check endpoint for smoke testing
   * @returns Health status
   */
  @Get('health')
  @HttpCode(HttpStatus.OK)
  public getHealth(): { status: string; timestamp: string } {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Admin test endpoint for smoke testing with sample data
   * @returns Sample risk calculation result
   */
  @Get('admin/test')
  @HttpCode(HttpStatus.OK)
  public adminTest(): RiskOutputDto {
    const sampleInput: RiskInput = {
      vulnerabilidades: 3,
      amenazas: 4,
      impacto: 5,
      mitigacion: 2,
    };

    const result = this.riskService.calculateRisk(sampleInput);

    return {
      score: result.score,
      category: result.category,
      explanation: result.explanation,
    };
  }
}
