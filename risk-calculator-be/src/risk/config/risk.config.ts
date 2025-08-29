import { RiskConfig } from '../types/risk.types';

export const defaultRiskConfig: RiskConfig = {
  thresholds: {
    low: 0.3,
    medium: 0.7,
  },
  weights: {
    vulnerabilityWeight: 1.0,
    threatWeight: 1.0,
    impactWeight: 1.0,
    mitigationWeight: 1.0,
  },
} as const;
