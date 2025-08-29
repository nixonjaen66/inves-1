# Risk Calculator Backend

Backend API para la aplicación Risk Calculator construido con NestJS, TypeScript y validación estricta.

## 🚀 Características

- **API RESTful**: Endpoints bien estructurados con validación completa
- **Validación Estricta**: DTOs con class-validator para validación de entrada
- **TypeScript**: Código completamente tipado para mayor seguridad
- **Tests Unitarios**: Cobertura completa de tests para servicios y controladores
- **Configuración Modular**: Arquitectura limpia siguiendo principios SOLID
- **Compatibilidad Frontend**: Tipos compatibles con el frontend Next.js

## 🛠️ Tecnologías

- **Framework**: NestJS 10+
- **Lenguaje**: TypeScript
- **Validación**: class-validator + class-transformer
- **Configuración**: @nestjs/config
- **Testing**: Jest con @nestjs/testing

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone <repository-url>
cd risk-calculator-be
```

2. Instala las dependencias:
```bash
npm install
```

3. Ejecuta el servidor de desarrollo:
```bash
npm run start:dev
```

4. La API estará disponible en `http://localhost:3001`

## 🧪 Scripts Disponibles

- `npm run start` - Servidor de producción
- `npm run start:dev` - Servidor de desarrollo con hot reload
- `npm run start:debug` - Servidor de desarrollo con debugging
- `npm run build` - Construir para producción
- `npm run lint` - Ejecutar ESLint
- `npm run format` - Formatear código con Prettier
- `npm run test` - Ejecutar tests unitarios
- `npm run test:watch` - Ejecutar tests en modo watch
- `npm run test:cov` - Ejecutar tests con cobertura

## 📁 Estructura del Proyecto

```
src/
├── main.ts                    # Punto de entrada de la aplicación
├── app.module.ts              # Módulo principal
└── risk/                      # Módulo de riesgo
    ├── risk.module.ts         # Configuración del módulo
    ├── controllers/           # Controladores REST
    │   ├── risk.controller.ts
    │   └── risk.controller.spec.ts
    ├── services/              # Lógica de negocio
    │   ├── risk.service.ts
    │   └── risk.service.spec.ts
    ├── dto/                   # Data Transfer Objects
    │   ├── risk-input.dto.ts
    │   ├── risk-config.dto.ts
    │   ├── risk-output.dto.ts
    │   └── index.ts
    ├── types/                 # Definiciones de tipos
    │   └── risk.types.ts
    └── config/                # Configuración
        └── risk.config.ts
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

## 🔌 Endpoints de la API

### POST `/api/v1/risk/calculate`

Calcula el riesgo financiero basado en los parámetros de entrada.

**Request Body:**
```json
{
  "ingresos": 5000,
  "gastos": 1000,
  "edad": 25,
  "factorAjuste": 1.0,
  "config": {
    "thresholds": {
      "low": 0.3,
      "medium": 0.7
    },
    "weights": {
      "incomeWeight": 1.0,
      "expenseWeight": 1.0,
      "ageWeight": 1.0,
      "adjustmentWeight": 1.0
    }
  }
}
```

**Response:**
```json
{
  "score": 0.05,
  "category": "low",
  "explanation": "Tu perfil de riesgo es BAJO (0.05). Tienes una buena relación entre ingresos y gastos, y tu edad contribuye positivamente al perfil de riesgo."
}
```

### GET `/api/v1/risk/health`

Endpoint de health check para monitoreo.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### GET `/api/v1/risk/admin/test`

Endpoint de prueba con datos de ejemplo.

**Response:**
```json
{
  "score": 0.05,
  "category": "low",
  "explanation": "Tu perfil de riesgo es BAJO (0.05). Tienes una buena relación entre ingresos y gastos, y tu edad contribuye positivamente al perfil de riesgo."
}
```

## 🔒 Validaciones

### RiskInputDto
- `ingresos`: Número > 0 (requerido)
- `gastos`: Número >= 0 (requerido)
- `edad`: Número entre 18-100 (requerido)
- `factorAjuste`: Número > 0 (opcional, default 1.0)

### RiskConfigDto
- `thresholds.low`: Número >= 0
- `thresholds.medium`: Número >= thresholds.low
- `weights`: Objeto opcional con pesos numéricos

## 🧪 Testing

Los tests cubren:
- Cálculos de riesgo para todas las categorías
- Validación de inputs y configuración
- Manejo de errores
- Endpoints del controlador

Ejecutar tests:
```bash
npm test
```

Ejecutar tests con cobertura:
```bash
npm run test:cov
```

## 🌐 CORS

La API está configurada para aceptar requests desde:
- `http://localhost:3000` (frontend por defecto)
- Configurable via variable de entorno `FRONTEND_URL`

## 🔧 Variables de Entorno

- `PORT`: Puerto del servidor (default: 3001)
- `FRONTEND_URL`: URL del frontend para CORS (default: http://localhost:3000)

## 🚀 Despliegue

Para desplegar en producción:

```bash
npm run build
npm run start:prod
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
