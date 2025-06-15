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
RUN npm run build

# Production stage
FROM nginx:1.27-alpine-slim

# Güvenlik iyileştirmeleri: Nginx'in önbellek dizinlerinin sahipliğini ayarla
RUN chown -R nginx:nginx /var/cache/nginx && \
    chmod -R 755 /var/cache/nginx && \
    rm -rf /etc/nginx/conf.d/*.default

# Build çıktısını kopyala
COPY --from=builder --chown=nginx:nginx /app/build /usr/share/nginx/html

# Nginx konfigürasyonunu doğrudan Dockerfile içinde oluştur (CRITICAL FIX!)
# Bu yöntem, harici dosya hatalarını veya önbellekleme sorunlarını tamamen ortadan kaldırır.
# Bu TEK BİR `RUN` komutudur ve çok dikkatli kopyalanmalıdır.
RUN --mount=type=tmpfs,target=/tmp/nginx \
    echo 'events { worker_connections 1024; } http { include /etc/nginx/mime.types; default_type application/octet-stream; sendfile on; tcp_nopush on; tcp_nodelay on; keepalive_timeout 65; types_hash_max_size 2048; gzip on; gzip_types text/plain text/css application/json application/javascript text/xml application/xml+rss text/javascript; gzip_vary on; gzip_comp_level 6; gzip_min_length 1024; server { listen 80; server_name localhost; root /usr/share/nginx/html; index index.html index.htm; location / { try_files \$uri \$uri/ /index.html; } location /api/ { proxy_pass http://backend:8000; proxy_set_header Host \$host; proxy_set_header X-Real-IP \$remote_addr; proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for; proxy_set_header X-Forwarded-Proto \$scheme; proxy_http_version 1.1; proxy_set_header Connection ""; } location /static/ { alias /usr/share/nginx/html/static/; expires 30d; add_header Cache-Control "public, no-transform"; autoindex off; } location /media/ { alias /usr/share/nginx/html/media/; expires 30d; add_header Cache-Control "public, no-transform"; autoindex off; } error_page 404 /404.html; location = /404.html { internal; } error_page 500 502 503 504 /50x.html; location = /50x.html { internal; } access_log /var/log/nginx/access.log; error_log /var/log/nginx/error.log; } }' > /tmp/nginx/default.conf && \
    mv /tmp/nginx/default.conf /etc/nginx/conf.d/default.conf

# Sağlık kontrolü ekle
HEALTHCHECK --interval=30s --timeout=3s \
    CMD curl -f http://localhost/ || exit 1

# Port ve çalıştırma komutu
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]