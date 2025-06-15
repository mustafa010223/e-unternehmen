FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

# Install app dependencies
# For production, it's better to use 'npm ci --omit=dev'
# to only install production dependencies and ensure a clean install
RUN npm ci --omit=dev

COPY . .

EXPOSE 5000

# Healthcheck instruction for Docker to verify container health
# Kubernetes will use its own probes defined in the deployment YAML
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5000/healthz || exit 1

CMD [ "node", "index.js" ]
