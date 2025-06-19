# --------------------------------------------------------------------------
# STAGE 1: Builder - React uygulamasını derleme
# --------------------------------------------------------------------------
FROM node:18-alpine AS builder

# Güvenlik için non-root kullanıcı oluştur
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# package.json dosyalarını kopyala ve bağımlılıkları yükle
# Not: Önce sahipliği değiştirerek npm'in hata vermesini engelle
RUN chown -R appuser:appgroup /app
USER appuser

COPY --chown=appuser:appgroup package*.json ./
RUN npm ci --ignore-scripts

# Geri kalan kaynak kodlarını kopyala ve uygulamayı derle
COPY --chown=appuser:appgroup . .
RUN npm run build

# --------------------------------------------------------------------------
# STAGE 2: Production - Nginx ile statik dosyaları sunma
# --------------------------------------------------------------------------
FROM nginx:1.27-alpine-slim

# Önceki hatalı veya varsayılan Nginx yapılandırmalarını temizle
RUN rm -f /etc/nginx/conf.d/*

# Builder aşamasından derlenmiş statik dosyaları Nginx'in sunacağı dizine kopyala
COPY --from=builder /app/build /usr/share/nginx/html

# DÜZELTME: Ayrı bir nginx.conf dosyasını kopyalayarak yapılandırma hatalarını çöz.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Nginx kullanıcısının dosyalara erişebildiğinden emin ol
RUN chown -R nginx:nginx /usr/share/nginx/html /var/cache/nginx /var/log/nginx && \
    chmod -R 755 /var/cache/nginx

# Non-root kullanıcı olarak çalıştır
USER nginx

# İYİLEŞTİRME: Uygulamanın çalışıp çalışmadığını kontrol etmek için HEALTHCHECK eklendi.
HEALTHCHECK --interval=30s --timeout=3s \
    CMD curl -f http://localhost/ || exit 1

# Port'u dışarıya aç ve Nginx'i başlat
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]