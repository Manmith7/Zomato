import express from 'express';
import dotenv from 'dotenv';
import { connect } from './config/db.js';
import AuthRoutes from './routes/auth.js';
import  {connectProducer} from './kafka/producer.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/', AuthRoutes);

connect()
  .then(async() => {
    console.log('✅ Tables synced');
    // await connectProducer();
    // console.log('Kafka producer connected');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server listening on http://0.0.0.0:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database error:', err.message);
    process.exit(1);
  });
