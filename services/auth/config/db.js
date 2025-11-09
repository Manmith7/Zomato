import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

console.log('DB URL:', process.env.DATABASE_URL);

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,
});

export const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to Restaurant Database via Sequelize');
  } catch (err) {
    console.error('❌ Error connecting via Sequelize', err);
  }
};

export { sequelize };
