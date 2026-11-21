import { Sequelize } from 'sequelize';

const requiredVariables = ['MYSQL_DATABASE', 'MYSQL_USER', 'MYSQL_PASSWORD'];
const missingVariables = requiredVariables.filter(
  (variable) => process.env[variable] === undefined,
);

if (missingVariables.length > 0) {
  throw new Error(
    `Missing MySQL configuration: ${missingVariables.join(', ')}. Set these variables in Back-End/.env.`,
  );
}

export const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST || 'localhost',
    port: Number(process.env.MYSQL_PORT || 3306),
    dialect: 'mysql',
    logging: false,
  },
);
