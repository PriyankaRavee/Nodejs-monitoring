const express = require('express');
const client = require('prom-client'); // Prometheus client

const app = express();
const port = 3000;

// Create a counter metric
const requestCounter = new client.Counter({
  name: 'nodejs_requests_total',
  help: 'Total number of requests received'
});

app.get('/api', (req, res) => {
  requestCounter.inc(); // Increment on each request
  res.send('Hello from backend!');
});

// Prometheus metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(port, () => console.log(`Backend running on port ${port}`));
