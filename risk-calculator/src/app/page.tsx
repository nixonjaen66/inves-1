'use client';

import { useState, useCallback } from 'react';
import { RiskForm } from '../components/RiskForm';
import { ResultCard } from '../components/ResultCard';
import { ConfigPanel } from '../components/ConfigPanel';
import { calculateRisk } from '../lib/risk';
import { defaultRiskConfig, type RiskConfig } from '../risk.config';
import type { RiskInput, RiskOutput } from '../lib/risk';

export default function HomePage() {
  const [result, setResult] = useState<RiskOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [config, setConfig] = useState<RiskConfig>(defaultRiskConfig);

  const handleCalculate = useCallback(async (input: RiskInput) => {
    setIsLoading(true);
    try {
      // Simular un pequeño delay para mostrar el estado de carga
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const calculatedResult = calculateRisk(input, config);
      setResult(calculatedResult);
    } catch (error) {
      console.error('Error al calcular el riesgo:', error);
      // En una aplicación real, aquí mostrarías un toast o notificación de error
    } finally {
      setIsLoading(false);
    }
  }, [config]);

  const handleReset = useCallback(() => {
    setResult(null);
  }, []);

  const handleConfigChange = useCallback((newConfig: RiskConfig) => {
    setConfig(newConfig);
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Calculadora de Riesgo de Seguridad
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Evalúa el riesgo de seguridad de tu sistema basado en vulnerabilidades, amenazas e impacto. 
          Obtén insights personalizados para mejorar la protección de tu infraestructura.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form and Config Panel */}
        <div className="lg:col-span-2 space-y-6">
          <RiskForm
            onSubmit={handleCalculate}
            onReset={handleReset}
            isLoading={isLoading}
          />
          
          <ConfigPanel
            config={config}
            onConfigChange={handleConfigChange}
          />
        </div>

        {/* Results */}
        <div className="lg:col-span-1">
          {result ? (
            <ResultCard result={result} />
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Sin Resultados
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Completa el formulario y haz clic en "Calcular Riesgo" para ver el análisis de riesgo de seguridad.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pt-8 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Esta herramienta es solo informativa y no constituye asesoramiento de seguridad profesional.
        </p>
      </div>
    </div>
  );
}
