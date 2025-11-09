import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { connect } from './config/db.js';
import restaurantRoutes from './routes/restaurant.js'; 
import categoryRoutes from './routes/category.js';
import subcategoryRoutes from './routes/subcategory.js';
import dishRoutes from './routes/dish.js';


const app = express();
const PORT = process.env.PORT || 3000;

connect();
app.use(express.json());

app.use('/api/restaurant', restaurantRoutes); 
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subcategoryRoutes);
app.use('/api/dishes', dishRoutes);

app.listen(PORT, () => {
  console.log(`Restaurant service is running on port ${PORT}`);
});
