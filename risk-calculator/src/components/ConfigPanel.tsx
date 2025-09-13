'use client';

import React, { useState, useCallback } from 'react';
import clsx from 'clsx';
import type { RiskConfig } from '../risk.config';

// Ensure JSX namespace exists (fixes "JSX.IntrinsicElements" missing error)
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

// 🔧 Quita readonly de un tipo recursivamente (sin tocar risk.config)
type Mutable<T> = {
  -readonly [P in keyof T]: T[P] extends object ? Mutable<T[P]> : T[P];
};

interface ConfigPanelProps {
  config: RiskConfig;
  onConfigChange: (config: RiskConfig) => void;
}

export const ConfigPanel = ({ config, onConfigChange }: ConfigPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // ⬅️ Trabajamos con una copia mutable solo en el estado local
  const [localConfig, setLocalConfig] = useState<Mutable<RiskConfig>>(
    JSON.parse(JSON.stringify(config)) as Mutable<RiskConfig>,
  );

  const handleThresholdChange = useCallback(
    (key: 'low' | 'medium', value: string) => {
      const numValue = parseFloat(value) || 0;
      const newConfig: Mutable<RiskConfig> = {
        ...localConfig,
        thresholds: {
          ...localConfig.thresholds,
          [key]: numValue,
        },
      };
      setLocalConfig(newConfig);
      onConfigChange(newConfig as RiskConfig); // ← forzamos al tipo original al emitir
    },
    [localConfig, onConfigChange],
  );

  const handleWeightChange = useCallback(
    (key: keyof RiskConfig['weights'], value: string) => {
      const numValue = parseFloat(value) || 1.0;
      const newConfig: Mutable<RiskConfig> = {
        ...localConfig,
        weights: {
          ...localConfig.weights,
          [key]: numValue,
        },
      };
      setLocalConfig(newConfig);
      onConfigChange(newConfig as RiskConfig);
    },
    [localConfig, onConfigChange],
  );

  const handleReset = useCallback(() => {
    const defaultConfig: Mutable<RiskConfig> = {
      thresholds: { low: 0.3, medium: 0.7 },
      weights: {
        vulnerabilityWeight: 1.0,
        threatWeight: 1.0,
        impactWeight: 1.0,
        mitigationWeight: 1.0,
      },
    };
    setLocalConfig(defaultConfig);
    onConfigChange(defaultConfig as RiskConfig);
  }, [onConfigChange]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors rounded-lg"
        aria-expanded={isOpen}
        aria-controls="config-content"
      >
        <div className="flex items-center gap-3">
          <svg
            className={clsx(
              'w-5 h-5 text-gray-500 transition-transform duration-200',
              isOpen && 'rotate-90',
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Configuración Avanzada
          </h3>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {isOpen ? 'Ocultar' : 'Mostrar'}
        </span>
      </button>

      {isOpen && (
        <div id="config-content" className="px-6 pb-6 space-y-6">
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-4">Umbrales de Riesgo</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="low-threshold" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Umbral Bajo
                </label>
                <input
                  type="number"
                  id="low-threshold"
                  value={localConfig.thresholds.low}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleThresholdChange('low', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  step="0.1"
                  min="0"
                  max={localConfig.thresholds.medium}
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Scores ≤ {localConfig.thresholds.low} = Riesgo bajo
                </p>
              </div>
              <div>
                <label htmlFor="medium-threshold" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Umbral Medio
                </label>
                <input
                  type="number"
                  id="medium-threshold"
                  value={localConfig.thresholds.medium}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleThresholdChange('medium', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  step="0.1"
                  min={localConfig.thresholds.low}
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Scores ≤ {localConfig.thresholds.medium} = Riesgo medio
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-4">
              Pesos de Factores (Avanzado)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="vulnerability-weight" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Peso de Vulnerabilidades
                </label>
                <input
                  type="number"
                  id="vulnerability-weight"
                  value={localConfig.weights.vulnerabilityWeight}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleWeightChange('vulnerabilityWeight', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  step="0.1"
                  min="0"
                />
              </div>
              <div>
                <label htmlFor="threat-weight" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Peso de Amenazas
                </label>
                <input
                  type="number"
                  id="threat-weight"
                  value={localConfig.weights.threatWeight}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleWeightChange('threatWeight', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  step="0.1"
                  min="0"
                />
              </div>
              <div>
                <label htmlFor="impact-weight" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Peso de Impacto
                </label>
                <input
                  type="number"
                  id="impact-weight"
                  value={localConfig.weights.impactWeight}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleWeightChange('impactWeight', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  step="0.1"
                  min="0"
                />
              </div>
              <div>
                <label htmlFor="mitigation-weight" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Peso de Mitigación
                </label>
                <input
                  type="number"
                  id="mitigation-weight"
                  value={localConfig.weights.mitigationWeight}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleWeightChange('mitigationWeight', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  step="0.1"
                  min="0"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <button
              onClick={handleReset}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Restaurar Valores por Defecto
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
