# Build stage
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Runtime stage
FROM nginx:1.27-alpine

# Use custom nginx config for SPA routing + optional Ollama proxy
COPY deploy/nginx/default.conf /etc/nginx/conf.d/default.conf

# Serve built frontend
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
