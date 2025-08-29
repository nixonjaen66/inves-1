'use client';

import clsx from 'clsx';
import type { RiskOutput } from '../lib/risk';

interface ResultCardProps {
  result: RiskOutput;
}

export const ResultCard = ({ result }: ResultCardProps) => {
  const { score, category, explanation } = result;

  const categoryConfig = {
    low: {
      label: 'BAJO',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800',
      textColor: 'text-green-800 dark:text-green-200',
      badgeColor: 'bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200',
    },
    medium: {
      label: 'MEDIO',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      borderColor: 'border-yellow-200 dark:border-yellow-800',
      textColor: 'text-yellow-800 dark:text-yellow-200',
      badgeColor: 'bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200',
    },
    high: {
      label: 'ALTO',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      borderColor: 'border-red-200 dark:border-red-800',
      textColor: 'text-red-800 dark:text-red-200',
      badgeColor: 'bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200',
    },
  };

  const config = categoryConfig[category];

  return (
    <div
      className={clsx(
        'rounded-lg border p-6 shadow-lg transition-all duration-300',
        config.bgColor,
        config.borderColor
      )}
      role="region"
      aria-live="polite"
      aria-label={`Resultado del cálculo de riesgo: ${config.label}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Resultado del Cálculo
        </h3>
        <span
          className={clsx(
            'px-3 py-1 rounded-full text-sm font-medium',
            config.badgeColor
          )}
        >
          Riesgo {config.label}
        </span>
      </div>

      <div className="space-y-4">
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Score de Riesgo
          </p>
          <p className={clsx('text-3xl font-bold', config.textColor)}>
            {score.toFixed(2)}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">
            Explicación
          </h4>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            {explanation}
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">
            Interpretación del Score
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-700 dark:text-gray-300">
                <strong>0.00 - 0.30:</strong> Riesgo bajo - Buena gestión financiera
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-700 dark:text-gray-300">
                <strong>0.31 - 0.70:</strong> Riesgo medio - Oportunidad de mejora
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-700 dark:text-gray-300">
                <strong>0.71+:</strong> Riesgo alto - Requiere atención inmediata
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
