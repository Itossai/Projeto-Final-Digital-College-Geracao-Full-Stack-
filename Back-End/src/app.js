import express from 'express';

const app = express();

app.use(express.json());

app.get('/api/health', (request, response) => {
  response.json({ status: 'ok' });
});

app.use((request, response) => {
  response.status(404).json({ error: 'Route not found' });
});

export default app;
