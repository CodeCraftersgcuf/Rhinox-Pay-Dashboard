# ============================================
# Rhinox Pay Admin Dashboard — Production
# Multi-stage: Node build + nginx serve
# ============================================

# Stage 1: Build the Vite/React app
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

# Override at build time in Dokploy (Build Args)
ARG VITE_API_BASE_URL=https://rhinoxpay.hmstech.org/api
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:1.27-alpine AS production

RUN apk add --no-cache curl

# Remove default nginx site
RUN rm -f /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY nginx/conf.d/ssl.conf.template /etc/nginx/conf.d/ssl.conf.template
COPY docker-entrypoint.d/40-enable-ssl.sh /docker-entrypoint.d/40-enable-ssl.sh
RUN chmod +x /docker-entrypoint.d/40-enable-ssl.sh

COPY --from=builder /app/dist /usr/share/nginx/html

RUN mkdir -p /etc/nginx/ssl

EXPOSE 80 443

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD curl -f http://localhost/health || exit 1
