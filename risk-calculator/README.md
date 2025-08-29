# Risk Calculator

Una aplicación web moderna para calcular el perfil de riesgo financiero basado en ingresos, gastos y edad.

## 🚀 Características

- **Cálculo de Riesgo**: Algoritmo personalizable para evaluar el perfil de riesgo financiero
- **Validación en Tiempo Real**: Validación de formularios con feedback visual
- **Configuración Avanzada**: Panel colapsable para ajustar umbrales y pesos
- **Diseño Responsivo**: Interfaz moderna y accesible con soporte para modo oscuro
- **TypeScript**: Código completamente tipado para mayor seguridad
- **Tests Unitarios**: Cobertura de tests para la lógica de cálculo

## 🛠️ Tecnologías

- **Framework**: Next.js 14+ (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: TailwindCSS
- **Utilidades**: clsx para clases condicionales
- **Testing**: Jest con @testing-library/jest-dom

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone <repository-url>
cd risk-calculator
```

2. Instala las dependencias:
```bash
npm install
```

3. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🧪 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Construir para producción
- `npm run start` - Servidor de producción
- `npm run lint` - Ejecutar ESLint
- `npm run format` - Formatear código con Prettier
- `npm run test` - Ejecutar tests unitarios

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── globals.css          # Estilos globales con Tailwind
│   ├── layout.tsx           # Layout principal con metadata
│   └── page.tsx             # Página principal
├── components/
│   ├── RiskForm.tsx         # Formulario de entrada con validación
│   ├── ResultCard.tsx       # Tarjeta de resultado con colores
│   └── ConfigPanel.tsx      # Panel de configuración colapsable
├── lib/
│   ├── risk.ts              # Lógica de cálculo de riesgo
│   └── __tests__/           # Tests unitarios
└── risk.config.ts           # Configuración por defecto
```

## 🧮 Fórmula de Cálculo

La fórmula base para calcular el riesgo es:

```
riesgo = ((gastos / ingresos) * (edad / 100)) * factorAjuste
```

### Categorías de Riesgo

- **Bajo**: Score ≤ 0.30
- **Medio**: Score 0.31 - 0.70
- **Alto**: Score > 0.70

## 🎨 Componentes

### RiskForm
Formulario principal con validación en tiempo real:
- Validación de ingresos > 0
- Validación de gastos ≥ 0
- Validación de edad entre 18-100
- Factor de ajuste opcional

### ResultCard
Muestra el resultado del cálculo con:
- Score con 2 decimales
- Categoría de riesgo con colores
- Explicación personalizada
- Interpretación de rangos

### ConfigPanel
Panel colapsable para configuración avanzada:
- Umbrales de riesgo personalizables
- Pesos de factores ajustables
- Botón para restaurar valores por defecto

## ♿ Accesibilidad

- Etiquetas `aria-*` apropiadas
- `aria-invalid` para campos con errores
- `aria-describedby` para mensajes de error
- `aria-live="polite"` para resultados dinámicos
- Navegación por teclado completa
- Contraste de colores adecuado

## 🧪 Testing

Los tests cubren:
- Cálculos de riesgo para todas las categorías
- Validación de inputs
- Manejo de errores
- Configuraciones personalizadas

Ejecutar tests:
```bash
npm test
```

## 🚀 Despliegue

Para desplegar en producción:

```bash
npm run build
npm start
```

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Para soporte o preguntas, por favor abre un issue en el repositorio.
