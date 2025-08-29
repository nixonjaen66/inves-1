import { defaultRiskConfig, type RiskConfig } from '../risk.config';

export type RiskInput = {
  vulnerabilidades: number;
  amenazas: number;
  impacto: number;
  mitigacion?: number;
};

export type RiskOutput = {
  score: number;
  category: 'low' | 'medium' | 'high';
  explanation: string;
};

export const calculateRisk = (
  input: RiskInput,
  config: RiskConfig = defaultRiskConfig
): RiskOutput => {
  const { vulnerabilidades, amenazas, impacto, mitigacion = 0 } = input;
  const { thresholds, weights } = config;

  // Validar inputs
  if (vulnerabilidades < 0 || vulnerabilidades > 10) {
    throw new Error('Las vulnerabilidades deben estar entre 0 y 10');
  }
  if (amenazas < 0 || amenazas > 10) {
    throw new Error('Las amenazas deben estar entre 0 y 10');
  }
  if (impacto < 0 || impacto > 10) {
    throw new Error('El impacto debe estar entre 0 y 10');
  }
  if (mitigacion < 0 || mitigacion > 10) {
    throw new Error('La mitigación debe estar entre 0 y 10');
  }

  // Calcular score usando la fórmula: ((vulnerabilidades * amenazas * impacto) / 1000) * (1 - mitigacion/10)
  const baseScore = (vulnerabilidades * amenazas * impacto) / 1000;
  const mitigationFactor = 1 - (mitigacion / 10);
  const finalScore = baseScore * mitigationFactor;

  // Determinar categoría
  let category: 'low' | 'medium' | 'high';
  if (finalScore <= thresholds.low) {
    category = 'low';
  } else if (finalScore <= thresholds.medium) {
    category = 'medium';
  } else {
    category = 'high';
  }

  // Generar explicación
  const explanations = {
    low: `El riesgo de seguridad es BAJO (${finalScore.toFixed(2)}). El sistema tiene buenas medidas de protección y las amenazas identificadas son mínimas.`,
    medium: `El riesgo de seguridad es MEDIO (${finalScore.toFixed(2)}). Se recomienda revisar las vulnerabilidades identificadas y fortalecer las medidas de mitigación.`,
    high: `El riesgo de seguridad es ALTO (${finalScore.toFixed(2)}). Se requiere atención inmediata para reducir vulnerabilidades y mejorar las medidas de protección.`,
  };

  return {
    score: Number(finalScore.toFixed(2)),
    category,
    explanation: explanations[category],
  };
};
