# Builder stage
FROM node:18-alpine AS builder

# Güvenlik için non-root kullanıcı oluştur
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# package.json dosyalarını kopyalamadan önce /app dizininin sahipliğini appuser'a ver
# Bu, npm ci'nin node_modules dizinini oluşturabilmesi için gerekli
RUN chown -R appuser:appgroup /app

COPY --chown=appuser:appgroup package*.json ./

# Non-root kullanıcıya geç ve bağımlılıkları yükle
USER appuser
RUN npm ci --ignore-scripts

COPY --chown=appuser:appgroup . .
# Frontend uygulamaları için 'build' script'i çalıştırılır.
# Bu script, uygulamanın üretim için optimize edilmiş statik dosyalarını oluşturur.
RUN npm run build

# Production stage
FROM nginx:1.27-alpine-slim

# Güvenlik iyileştirmeleri: Nginx'in önbellek dizinlerinin sahipliğini ayarla
RUN chown -R nginx:nginx /var/cache/nginx && \
    chmod -R 755 /var/cache/nginx && \
    rm -rf /etc/nginx/conf.d/*.default

# Builder aşamasında oluşturulan build çıktısını Nginx'in servis edeceği dizine kopyala
COPY --from=builder --chown=nginx:nginx /app/build /usr/share/nginx/html

# Nginx konfigürasyon dosyasını kopyala
# Bu dosyanın (frontend/nginx.conf) projenin 'frontend' dizininde bulunması gerekmektedir.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Sağlık kontrolü ekle: Nginx sunucusunun çalıştığını doğrular
HEALTHCHECK --interval=30s --timeout=3s \
    CMD curl -f http://localhost/ || exit 1

# Konteynerin dışarıya açılacağı portu belirt
EXPOSE 80
# Nginx'i arka planda değil, foreground'da çalıştırarak Docker'ın konteyneri takip etmesini sağla
CMD ["nginx", "-g", "daemon off;"]