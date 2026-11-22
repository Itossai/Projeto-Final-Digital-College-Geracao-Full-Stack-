import express from 'express';
import categoryRoutes from './routes/category.js';
import userRoutes from './routes/user.js';

const app = express();

app.use(express.json());

app.get('/api/health', (request, response) => {
  response.json({ status: 'ok' });
});

app.use('/v1/user', userRoutes);
app.use('/v1/category', categoryRoutes);

app.use((request, response) => {
  response.status(404).json({ error: 'Route not found' });
});

export default app;
