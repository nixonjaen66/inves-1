# --- deps ---
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci || npm install

# --- build ---
FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# compila a dist/
RUN npx nest --version >/dev/null 2>&1 || npm i -D @nestjs/cli typescript
RUN npm run build

# --- run ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# copia solo lo necesario
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
# si usas archivos (ej. nest-winston rotando), crea dir
RUN mkdir -p /app/logs
# Render expone su propio PORT (usamos 3000 interno)
EXPOSE 3000
CMD ["node", "dist/main.js"]
