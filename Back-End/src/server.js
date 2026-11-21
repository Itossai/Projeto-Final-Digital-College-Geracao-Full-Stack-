import app from './app.js';
import { sequelize } from './models/index.js';

const port = process.env.PORT || 3000;

async function startServer() {
  await sequelize.authenticate();
  await sequelize.sync();
  console.log('MySQL connected and models synchronized.');

  app.listen(port, () => {
    console.log(`Back-End listening on http://localhost:${port}`);
  });
}

startServer().catch((error) => {
  console.error('Unable to start Back-End:', error);
  process.exitCode = 1;
});
