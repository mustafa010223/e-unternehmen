# Builder stage
FROM node:18-alpine AS builder

# Güvenlik için non-root kullanıcı oluştur
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app
COPY --chown=appuser:appgroup package*.json ./

# Non-root kullanıcıyla bağımlılıkları yükle
USER appuser
RUN npm ci --ignore-scripts

COPY --chown=appuser:appgroup . .
RUN npm run build

# Production stage
FROM nginx:1.27-alpine-slim

# Güvenlik iyileştirmeleri
RUN chown -R nginx:nginx /var/cache/nginx && \
    chmod -R 755 /var/cache/nginx && \
    rm -rf /etc/nginx/conf.d/*.default

# Build çıktısını kopyala
COPY --from=builder --chown=nginx:nginx /app/build /usr/share/nginx/html

# Nginx konfigürasyonu
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Sağlık kontrolü ekle
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost/ || exit 1

# Port ve çalıştırma komutu
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
