import { calculateRisk } from '../risk';
import { defaultRiskConfig } from '../../risk.config';

describe('calculateRisk', () => {
  it('should calculate low risk correctly', () => {
    const input = {
      vulnerabilidades: 2,
      amenazas: 3,
      impacto: 4,
      mitigacion: 8,
    };

    const result = calculateRisk(input, defaultRiskConfig);

    expect(result.score).toBeCloseTo(0.05, 2);
    expect(result.category).toBe('low');
    expect(result.explanation).toContain('BAJO');
  });

  it('should calculate medium risk correctly', () => {
    const input = {
      vulnerabilidades: 5,
      amenazas: 6,
      impacto: 7,
      mitigacion: 3,
    };

    const result = calculateRisk(input, defaultRiskConfig);

    expect(result.score).toBeCloseTo(0.29, 2);
    expect(result.category).toBe('medium');
    expect(result.explanation).toContain('MEDIO');
  });

  it('should calculate high risk correctly', () => {
    const input = {
      vulnerabilidades: 8,
      amenazas: 9,
      impacto: 10,
      mitigacion: 1,
    };

    const result = calculateRisk(input, defaultRiskConfig);

    expect(result.score).toBeCloseTo(0.65, 2);
    expect(result.category).toBe('high');
    expect(result.explanation).toContain('ALTO');
  });

  it('should apply mitigation factor correctly', () => {
    const input = {
      vulnerabilidades: 5,
      amenazas: 5,
      impacto: 5,
      mitigacion: 5,
    };

    const result = calculateRisk(input, defaultRiskConfig);

    expect(result.score).toBeCloseTo(0.13, 2);
    expect(result.category).toBe('low');
  });

  it('should use default mitigation when not provided', () => {
    const input = {
      vulnerabilidades: 5,
      amenazas: 5,
      impacto: 5,
    };

    const result = calculateRisk(input, defaultRiskConfig);

    expect(result.score).toBeCloseTo(0.13, 2);
    expect(result.category).toBe('low');
  });

  it('should throw error for invalid vulnerabilidades', () => {
    const input = {
      vulnerabilidades: 11,
      amenazas: 5,
      impacto: 5,
    };

    expect(() => calculateRisk(input, defaultRiskConfig)).toThrow(
      'Las vulnerabilidades deben estar entre 0 y 10'
    );
  });

  it('should throw error for negative amenazas', () => {
    const input = {
      vulnerabilidades: 5,
      amenazas: -1,
      impacto: 5,
    };

    expect(() => calculateRisk(input, defaultRiskConfig)).toThrow(
      'Las amenazas deben estar entre 0 y 10'
    );
  });

  it('should throw error for invalid impacto', () => {
    const input = {
      vulnerabilidades: 5,
      amenazas: 5,
      impacto: 15,
    };

    expect(() => calculateRisk(input, defaultRiskConfig)).toThrow(
      'El impacto debe estar entre 0 y 10'
    );
  });

  it('should throw error for invalid mitigacion', () => {
    const input = {
      vulnerabilidades: 5,
      amenazas: 5,
      impacto: 5,
      mitigacion: 11,
    };

    expect(() => calculateRisk(input, defaultRiskConfig)).toThrow(
      'La mitigación debe estar entre 0 y 10'
    );
  });

  it('should work with custom thresholds', () => {
    const customConfig = {
      ...defaultRiskConfig,
      thresholds: {
        low: 0.1,
        medium: 0.2,
      },
    };

    const input = {
      vulnerabilidades: 5,
      amenazas: 5,
      impacto: 5,
    };

    const result = calculateRisk(input, customConfig);

    expect(result.score).toBeCloseTo(0.13, 2);
    expect(result.category).toBe('low');
  });
});
