export type RiskInput = {
  vulnerabilidades: number;
  amenazas: number;
  impacto: number;
  mitigacion?: number;
};

export type RiskConfig = {
  thresholds: {
    low: number;
    medium: number;
  };
  weights?: Record<string, number>;
};

export type RiskOutput = {
  score: number;
  category: 'low' | 'medium' | 'high';
  explanation: string;
};
