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
    RUN --mount=type=tmpfs,target=/tmp/nginx \
        echo 'events { worker_connections 1024; }' > /tmp/nginx/default.conf && \
        echo 'http {' >> /tmp/nginx/default.conf && \
        echo '    include /etc/nginx/mime.types;' >> /tmp/nginx/default.conf && \
        echo '    default_type application/octet-stream;' >> /tmp/nginx/default.conf && \
        echo '    sendfile on;' >> /tmp/nginx/default.conf && \
        echo '    tcp_nopush on;' >> /tmp/nginx/default.conf && \
        echo '    tcp_nodelay on;' >> /tmp/nginx/default.conf && \
        echo '    keepalive_timeout 65;' >> /tmp/nginx/default.conf && \
        echo '    types_hash_max_size 2048;' >> /tmp/nginx/default.conf && \
        echo '    gzip on;' >> /tmp/nginx/default.conf && \
        echo '    gzip_types text/plain text/css application/json application/javascript text/xml application/xml+rss text/javascript;' >> /tmp/nginx/default.conf && \
        echo '    gzip_vary on;' >> /tmp/nginx/default.conf && \
        echo '    gzip_comp_level 6;' >> /tmp/nginx/default.conf && \
        echo '    gzip_min_length 1024;' >> /tmp/nginx/default.conf && \
        echo '    server {' >> /tmp/nginx/default.conf && \
        echo '        listen 80;' >> /tmp/nginx/default.conf && \
        echo '        server_name localhost;' >> /tmp/nginx/default.conf && \
        echo '        root /usr/share/nginx/html;' >> /tmp/nginx/default.conf && \
        echo '        index index.html index.htm;' >> /tmp/nginx/default.conf && \
        echo '        location / { try_files \$uri \$uri/ /index.html; }' >> /tmp/nginx/default.conf && \
        echo '        location /api/ { proxy_pass http://backend:8000; proxy_set_header Host \$host; proxy_set_header X-Real-IP \$remote_addr; proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for; proxy_set_header X-Forwarded-Proto \$scheme; proxy_http_version 1.1; proxy_set_header Connection ""; }' >> /tmp/nginx/default.conf && \
        echo '        location /static/ { alias /usr/share/nginx/html/static/; expires 30d; add_header Cache-Control "public, no-transform"; autoindex off; }' >> /tmp/nginx/default.conf && \
        echo '        location /media/ { alias /usr/share/nginx/html/media/; expires 30d; add_header Cache-Control "public, no-transform"; autoindex off; }' >> /tmp/nginx/default.conf && \
        echo '        error_page 404 /404.html;' >> /tmp/nginx/default.conf && \
        echo '        location = /404.html { internal; }' >> /tmp/nginx/default.conf && \
        echo '        error_page 500 502 503 504 /50x.html;' >> /tmp/nginx/default.conf && \
        echo '        location = /50x.html { internal; }' >> /tmp/nginx/default.conf && \
        echo '        access_log /var/log/nginx/access.log;' >> /tmp/nginx/default.conf && \
        echo '        error_log /var/log/nginx/error.log;' >> /tmp/nginx/default.conf && \
        echo '    }' >> /tmp/nginx/default.conf && \
        echo '}' >> /tmp/nginx/default.conf && \
        mv /tmp/nginx/default.conf /etc/nginx/conf.d/default.conf # Dosyayı doğru yere taşı
        
    # Nginx konfigürasyonunu doğrudan Dockerfile içinde oluşturmanın sonu

    # Sağlık kontrolü ekle
    HEALTHCHECK --interval=30s --timeout=3s \
        CMD curl -f http://localhost/ || exit 1

    # Port ve çalıştırma komutu
    EXPOSE 80
    CMD ["nginx", "-g", "daemon off;"]