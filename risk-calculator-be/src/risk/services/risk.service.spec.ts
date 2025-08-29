import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { RiskService } from './risk.service';
import { RiskInput, RiskConfig } from '../types/risk.types';
import { defaultRiskConfig } from '../config/risk.config';

describe('RiskService', () => {
  let service: RiskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RiskService],
    }).compile();

    service = module.get<RiskService>(RiskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('calculateRisk', () => {
    describe('with valid inputs', () => {
      it('should calculate low risk correctly', () => {
        // Arrange
        const inputRisk: RiskInput = {
          ingresos: 5000,
          gastos: 1000,
          edad: 25,
          factorAjuste: 1.0,
        };

        // Act
        const actualResult = service.calculateRisk(inputRisk);

        // Assert
        expect(actualResult.score).toBe(0.05);
        expect(actualResult.category).toBe('low');
        expect(actualResult.explanation).toContain('BAJO');
      });

      it('should calculate medium risk correctly', () => {
        // Arrange
        const inputRisk: RiskInput = {
          ingresos: 3000,
          gastos: 1500,
          edad: 35,
          factorAjuste: 1.0,
        };

        // Act
        const actualResult = service.calculateRisk(inputRisk);

        // Assert
        expect(actualResult.score).toBe(0.175);
        expect(actualResult.category).toBe('medium');
        expect(actualResult.explanation).toContain('MEDIO');
      });

      it('should calculate high risk correctly', () => {
        // Arrange
        const inputRisk: RiskInput = {
          ingresos: 2000,
          gastos: 1800,
          edad: 45,
          factorAjuste: 1.0,
        };

        // Act
        const actualResult = service.calculateRisk(inputRisk);

        // Assert
        expect(actualResult.score).toBe(0.405);
        expect(actualResult.category).toBe('high');
        expect(actualResult.explanation).toContain('ALTO');
      });

      it('should apply adjustment factor correctly', () => {
        // Arrange
        const inputRisk: RiskInput = {
          ingresos: 5000,
          gastos: 1000,
          edad: 25,
          factorAjuste: 2.0,
        };

        // Act
        const actualResult = service.calculateRisk(inputRisk);

        // Assert
        expect(actualResult.score).toBe(0.10);
        expect(actualResult.category).toBe('low');
      });

      it('should use default adjustment factor when not provided', () => {
        // Arrange
        const inputRisk: RiskInput = {
          ingresos: 5000,
          gastos: 1000,
          edad: 25,
        };

        // Act
        const actualResult = service.calculateRisk(inputRisk);

        // Assert
        expect(actualResult.score).toBe(0.05);
        expect(actualResult.category).toBe('low');
      });

      it('should work with custom thresholds', () => {
        // Arrange
        const inputRisk: RiskInput = {
          ingresos: 5000,
          gastos: 1000,
          edad: 25,
        };

        const customConfig: RiskConfig = {
          thresholds: {
            low: 0.1,
            medium: 0.2,
          },
          weights: {
            incomeWeight: 1.0,
            expenseWeight: 1.0,
            ageWeight: 1.0,
            adjustmentWeight: 1.0,
          },
        };

        // Act
        const actualResult = service.calculateRisk(inputRisk, customConfig);

        // Assert
        expect(actualResult.score).toBe(0.05);
        expect(actualResult.category).toBe('low');
      });
    });

    describe('with invalid inputs', () => {
      it('should throw error for invalid ingresos', () => {
        // Arrange
        const inputRisk: RiskInput = {
          ingresos: 0,
          gastos: 1000,
          edad: 25,
        };

        // Act & Assert
        expect(() => service.calculateRisk(inputRisk)).toThrow(
          BadRequestException,
        );
        expect(() => service.calculateRisk(inputRisk)).toThrow(
          'Los ingresos deben ser mayores a 0',
        );
      });

      it('should throw error for negative gastos', () => {
        // Arrange
        const inputRisk: RiskInput = {
          ingresos: 5000,
          gastos: -100,
          edad: 25,
        };

        // Act & Assert
        expect(() => service.calculateRisk(inputRisk)).toThrow(
          BadRequestException,
        );
        expect(() => service.calculateRisk(inputRisk)).toThrow(
          'Los gastos no pueden ser negativos',
        );
      });

      it('should throw error for invalid edad', () => {
        // Arrange
        const inputRisk: RiskInput = {
          ingresos: 5000,
          gastos: 1000,
          edad: 15,
        };

        // Act & Assert
        expect(() => service.calculateRisk(inputRisk)).toThrow(
          BadRequestException,
        );
        expect(() => service.calculateRisk(inputRisk)).toThrow(
          'La edad debe estar entre 18 y 100 años',
        );
      });

      it('should throw error for invalid factorAjuste', () => {
        // Arrange
        const inputRisk: RiskInput = {
          ingresos: 5000,
          gastos: 1000,
          edad: 25,
          factorAjuste: 0,
        };

        // Act & Assert
        expect(() => service.calculateRisk(inputRisk)).toThrow(
          BadRequestException,
        );
        expect(() => service.calculateRisk(inputRisk)).toThrow(
          'El factor de ajuste debe ser mayor a 0',
        );
      });
    });

    describe('with invalid configuration', () => {
      it('should throw error for negative low threshold', () => {
        // Arrange
        const inputRisk: RiskInput = {
          ingresos: 5000,
          gastos: 1000,
          edad: 25,
        };

        const invalidConfig: RiskConfig = {
          thresholds: {
            low: -0.1,
            medium: 0.7,
          },
          weights: defaultRiskConfig.weights,
        };

        // Act & Assert
        expect(() => service.calculateRisk(inputRisk, invalidConfig)).toThrow(
          BadRequestException,
        );
        expect(() => service.calculateRisk(inputRisk, invalidConfig)).toThrow(
          'El umbral bajo debe ser mayor o igual a 0',
        );
      });

      it('should throw error when medium threshold is less than low threshold', () => {
        // Arrange
        const inputRisk: RiskInput = {
          ingresos: 5000,
          gastos: 1000,
          edad: 25,
        };

        const invalidConfig: RiskConfig = {
          thresholds: {
            low: 0.5,
            medium: 0.3,
          },
          weights: defaultRiskConfig.weights,
        };

        // Act & Assert
        expect(() => service.calculateRisk(inputRisk, invalidConfig)).toThrow(
          BadRequestException,
        );
        expect(() => service.calculateRisk(inputRisk, invalidConfig)).toThrow(
          'El umbral medio debe ser mayor o igual al umbral bajo',
        );
      });
    });
  });
});
