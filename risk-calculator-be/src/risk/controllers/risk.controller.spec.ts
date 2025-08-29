import { Test, TestingModule } from '@nestjs/testing';
import { RiskController } from './risk.controller';
import { RiskService } from '../services/risk.service';
import { RiskInput } from '../types/risk.types';

describe('RiskController', () => {
  let controller: RiskController;
  let service: RiskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RiskController],
      providers: [
        {
          provide: RiskService,
          useValue: {
            calculateRisk: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<RiskController>(RiskController);
    service = module.get<RiskService>(RiskService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('calculateRisk', () => {
    it('should calculate risk with valid input', () => {
      // Arrange
      const mockInput = {
        ingresos: 5000,
        gastos: 1000,
        edad: 25,
        factorAjuste: 1.0,
      };

      const expectedResult = {
        score: 0.05,
        category: 'low' as const,
        explanation: 'Tu perfil de riesgo es BAJO (0.05)...',
      };

      jest.spyOn(service, 'calculateRisk').mockReturnValue(expectedResult);

      // Act
      const actualResult = controller.calculateRisk(mockInput);

      // Assert
      expect(service.calculateRisk).toHaveBeenCalledWith(
        {
          ingresos: 5000,
          gastos: 1000,
          edad: 25,
          factorAjuste: 1.0,
        },
        undefined,
      );
      expect(actualResult).toEqual(expectedResult);
    });

    it('should calculate risk with custom config', () => {
      // Arrange
      const mockInput = {
        ingresos: 5000,
        gastos: 1000,
        edad: 25,
        factorAjuste: 1.0,
        config: {
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
        },
      };

      const expectedResult = {
        score: 0.05,
        category: 'low' as const,
        explanation: 'Tu perfil de riesgo es BAJO (0.05)...',
      };

      jest.spyOn(service, 'calculateRisk').mockReturnValue(expectedResult);

      // Act
      const actualResult = controller.calculateRisk(mockInput);

      // Assert
      expect(service.calculateRisk).toHaveBeenCalledWith(
        {
          ingresos: 5000,
          gastos: 1000,
          edad: 25,
          factorAjuste: 1.0,
        },
        {
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
        },
      );
      expect(actualResult).toEqual(expectedResult);
    });
  });

  describe('getHealth', () => {
    it('should return health status', () => {
      // Act
      const result = controller.getHealth();

      // Assert
      expect(result).toHaveProperty('status', 'healthy');
      expect(result).toHaveProperty('timestamp');
      expect(new Date(result.timestamp)).toBeInstanceOf(Date);
    });
  });

  describe('adminTest', () => {
    it('should return sample risk calculation', () => {
      // Arrange
      const expectedResult = {
        score: 0.05,
        category: 'low' as const,
        explanation: 'Tu perfil de riesgo es BAJO (0.05)...',
      };

      jest.spyOn(service, 'calculateRisk').mockReturnValue(expectedResult);

      // Act
      const actualResult = controller.adminTest();

      // Assert
      expect(service.calculateRisk).toHaveBeenCalledWith({
        ingresos: 5000,
        gastos: 1000,
        edad: 25,
        factorAjuste: 1.0,
      });
      expect(actualResult).toEqual(expectedResult);
    });
  });
});
