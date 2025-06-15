const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Merhaba K3s CI/CD! Backend başarıyla çalışıyor.');
});

// Health check endpoint for Kubernetes liveness probe
app.get('/healthz', (req, res) => {
  // In a real app, you might check DB connection or other critical services
  res.status(200).send('OK');
});

// Readiness check endpoint for Kubernetes readiness probe
app.get('/readyz', (req, res) => {
    // In a real app, you might check if the app has finished starting up,
    // loaded necessary data, etc.
    res.status(200).send('OK');
});

app.listen(port, () => {
  console.log(`Backend sunucusu ${port} portunda çalışıyor...`);
});
