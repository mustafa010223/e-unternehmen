    # Backend Builder/Runtime stage
    FROM node:18-alpine

    # Güvenlik için non-root kullanıcı oluştur
    RUN addgroup -S appgroup && adduser -S appuser -G appgroup

    WORKDIR /usr/src/app

    # package.json dosyalarını kopyalamadan önce /usr/src/app dizininin sahipliğini appuser'a ver
    # Bu, npm bağımlılıklarının doğru izinlerle kurulabilmesi için gerekli
    RUN chown -R appuser:appgroup /usr/src/app

    COPY --chown=appuser:appgroup package*.json ./

    # Non-root kullanıcıya geç ve bağımlılıkları yükle
    # --omit=dev bayrağı, sadece üretim bağımlılıklarını kurar
    USER appuser
    RUN npm ci --omit=dev

    # Geri kalan uygulama kodunu kopyala
    COPY --chown=appuser:appgroup . .

    # *** Bu satırı kaldırdık/yorum satırı yaptık, çünkü backend genellikle 'build' adımı gerektirmez ***
    # RUN npm run build 

    # Konteynerin dışarıya açılacağı portu belirt
    EXPOSE 5000

    # Sağlık kontrolü ekle: Uygulamanın çalıştığını ve yanıt verdiğini doğrular
    HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
        CMD curl -f http://localhost:5000/healthz || exit 1

    # Uygulamayı başlatma komutu
    CMD [ "node", "index.js" ]

