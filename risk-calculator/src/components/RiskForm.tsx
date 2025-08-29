'use client';

import { useState, useCallback } from 'react';
import clsx from 'clsx';
import type { RiskInput } from '../lib/risk';

interface RiskFormProps {
  onSubmit: (data: RiskInput) => void;
  onReset: () => void;
  isLoading?: boolean;
}

interface FormErrors {
  vulnerabilidades?: string;
  amenazas?: string;
  impacto?: string;
  mitigacion?: string;
}

export const RiskForm = ({ onSubmit, onReset, isLoading = false }: RiskFormProps) => {
  const [formData, setFormData] = useState<RiskInput>({
    vulnerabilidades: 0,
    amenazas: 0,
    impacto: 0,
    mitigacion: 0,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateField = useCallback((name: keyof RiskInput, value: number): string => {
    switch (name) {
      case 'vulnerabilidades':
        if (value < 0 || value > 10) return 'Las vulnerabilidades deben estar entre 0 y 10';
        break;
      case 'amenazas':
        if (value < 0 || value > 10) return 'Las amenazas deben estar entre 0 y 10';
        break;
      case 'impacto':
        if (value < 0 || value > 10) return 'El impacto debe estar entre 0 y 10';
        break;
      case 'mitigacion':
        if (value < 0 || value > 10) return 'La mitigación debe estar entre 0 y 10';
        break;
    }
    return '';
  }, []);

  const handleInputChange = useCallback((name: keyof RiskInput, value: string) => {
    const numValue = parseFloat(value) || 0;
    setFormData(prev => ({ ...prev, [name]: numValue }));
    
    const error = validateField(name, numValue);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [validateField]);

  const isFormValid = useCallback(() => {
    return (
      formData.vulnerabilidades >= 0 &&
      formData.vulnerabilidades <= 10 &&
      formData.amenazas >= 0 &&
      formData.amenazas <= 10 &&
      formData.impacto >= 0 &&
      formData.impacto <= 10 &&
      formData.mitigacion! >= 0 &&
      formData.mitigacion! <= 10 &&
      Object.values(errors).every(error => !error)
    );
  }, [formData, errors]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      onSubmit(formData);
    }
  }, [formData, onSubmit, isFormValid]);

  const handleReset = useCallback(() => {
    setFormData({
      vulnerabilidades: 0,
      amenazas: 0,
      impacto: 0,
      mitigacion: 0,
    });
    setErrors({});
    onReset();
  }, [onReset]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="vulnerabilidades" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Vulnerabilidades (0-10) *
          </label>
          <input
            type="number"
            id="vulnerabilidades"
            name="vulnerabilidades"
            value={formData.vulnerabilidades || ''}
            onChange={(e) => handleInputChange('vulnerabilidades', e.target.value)}
            className={clsx(
              'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
              'dark:bg-gray-700 dark:border-gray-600 dark:text-white',
              errors.vulnerabilidades
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-600'
            )}
            aria-invalid={!!errors.vulnerabilidades}
            aria-describedby={errors.vulnerabilidades ? 'vulnerabilidades-error' : undefined}
            placeholder="0"
            step="0.1"
            min="0"
            max="10"
            required
          />
          {errors.vulnerabilidades && (
            <p id="vulnerabilidades-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.vulnerabilidades}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="amenazas" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Amenazas (0-10) *
          </label>
          <input
            type="number"
            id="amenazas"
            name="amenazas"
            value={formData.amenazas || ''}
            onChange={(e) => handleInputChange('amenazas', e.target.value)}
            className={clsx(
              'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
              'dark:bg-gray-700 dark:border-gray-600 dark:text-white',
              errors.amenazas
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-600'
            )}
            aria-invalid={!!errors.amenazas}
            aria-describedby={errors.amenazas ? 'amenazas-error' : undefined}
            placeholder="0"
            step="0.1"
            min="0"
            max="10"
            required
          />
          {errors.amenazas && (
            <p id="amenazas-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.amenazas}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="impacto" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Impacto (0-10) *
          </label>
          <input
            type="number"
            id="impacto"
            name="impacto"
            value={formData.impacto || ''}
            onChange={(e) => handleInputChange('impacto', e.target.value)}
            className={clsx(
              'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
              'dark:bg-gray-700 dark:border-gray-600 dark:text-white',
              errors.impacto
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-600'
            )}
            aria-invalid={!!errors.impacto}
            aria-describedby={errors.impacto ? 'impacto-error' : undefined}
            placeholder="0"
            step="0.1"
            min="0"
            max="10"
            required
          />
          {errors.impacto && (
            <p id="impacto-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.impacto}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="mitigacion" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Mitigación (0-10) *
          </label>
          <input
            type="number"
            id="mitigacion"
            name="mitigacion"
            value={formData.mitigacion || ''}
            onChange={(e) => handleInputChange('mitigacion', e.target.value)}
            className={clsx(
              'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
              'dark:bg-gray-700 dark:border-gray-600 dark:text-white',
              errors.mitigacion
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-600'
            )}
            aria-invalid={!!errors.mitigacion}
            aria-describedby={errors.mitigacion ? 'mitigacion-error' : undefined}
            placeholder="0"
            step="0.1"
            min="0"
            max="10"
            required
          />
          {errors.mitigacion && (
            <p id="mitigacion-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.mitigacion}
            </p>
          )}
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Medidas de protección implementadas (0 = ninguna, 10 = máxima protección)
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={!isFormValid() || isLoading}
          className={clsx(
            'flex-1 px-4 py-2 text-white font-medium rounded-md transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
            isFormValid() && !isLoading
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-400 cursor-not-allowed'
          )}
        >
          {isLoading ? 'Calculando...' : 'Calcular Riesgo'}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Limpiar
        </button>
      </div>
    </form>
  );
};
