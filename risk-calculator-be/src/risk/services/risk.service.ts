import { Injectable, BadRequestException } from '@nestjs/common';
import { RiskInput, RiskOutput, RiskConfig } from '../types/risk.types';
import { defaultRiskConfig } from '../config/risk.config';

@Injectable()
export class RiskService {
  /**
   * Calculates the security risk score based on vulnerabilities, threats, impact and mitigation
   * @param input - The risk input parameters
   * @param config - Optional configuration for thresholds and weights
   * @returns RiskOutput with score, category and explanation
   */
  public calculateRisk(
    input: RiskInput,
    config: RiskConfig = defaultRiskConfig,
  ): RiskOutput {
    this.validateInput(input);
    this.validateConfig(config);

    const { vulnerabilidades, amenazas, impacto, mitigacion = 0 } = input;
    const { thresholds } = config;

    // Calculate score using the formula: ((vulnerabilities * threats * impact) / 1000) * (1 - mitigation/10)
    const baseScore = (vulnerabilidades * amenazas * impacto) / 1000;
    const mitigationFactor = 1 - (mitigacion / 10);
    const finalScore = baseScore * mitigationFactor;

    // Determine category based on thresholds
    const category = this.determineCategory(finalScore, thresholds);

    // Generate explanation
    const explanation = this.generateExplanation(finalScore, category);

    return {
      score: Number(finalScore.toFixed(2)),
      category,
      explanation,
    };
  }

  /**
   * Validates the input parameters
   * @param input - The risk input to validate
   */
  private validateInput(input: RiskInput): void {
    const { vulnerabilidades, amenazas, impacto, mitigacion } = input;

    if (vulnerabilidades < 0 || vulnerabilidades > 10) {
      throw new BadRequestException('Las vulnerabilidades deben estar entre 0 y 10');
    }

    if (amenazas < 0 || amenazas > 10) {
      throw new BadRequestException('Las amenazas deben estar entre 0 y 10');
    }

    if (impacto < 0 || impacto > 10) {
      throw new BadRequestException('El impacto debe estar entre 0 y 10');
    }

    if (mitigacion !== undefined && (mitigacion < 0 || mitigacion > 10)) {
      throw new BadRequestException('La mitigación debe estar entre 0 y 10');
    }
  }

  /**
   * Validates the configuration parameters
   * @param config - The configuration to validate
   */
  private validateConfig(config: RiskConfig): void {
    const { thresholds } = config;

    if (thresholds.low < 0) {
      throw new BadRequestException('El umbral bajo debe ser mayor o igual a 0');
    }

    if (thresholds.medium < thresholds.low) {
      throw new BadRequestException(
        'El umbral medio debe ser mayor o igual al umbral bajo',
      );
    }
  }

  /**
   * Determines the risk category based on score and thresholds
   * @param score - The calculated risk score
   * @param thresholds - The threshold configuration
   * @returns The risk category
   */
  private determineCategory(
    score: number,
    thresholds: RiskConfig['thresholds'],
  ): 'low' | 'medium' | 'high' {
    if (score <= thresholds.low) {
      return 'low';
    }

    if (score <= thresholds.medium) {
      return 'medium';
    }

    return 'high';
  }

  /**
   * Generates an explanation based on the score and category
   * @param score - The calculated risk score
   * @param category - The determined risk category
   * @returns The explanation text
   */
  private generateExplanation(
    score: number,
    category: 'low' | 'medium' | 'high',
  ): string {
    const explanations = {
      low: `El riesgo de seguridad es BAJO (${score.toFixed(2)}). El sistema tiene buenas medidas de protección y las amenazas identificadas son mínimas.`,
      medium: `El riesgo de seguridad es MEDIO (${score.toFixed(2)}). Se recomienda revisar las vulnerabilidades identificadas y fortalecer las medidas de mitigación.`,
      high: `El riesgo de seguridad es ALTO (${score.toFixed(2)}). Se requiere atención inmediata para reducir vulnerabilidades y mejorar las medidas de protección.`,
    };

    return explanations[category];
  }
}
