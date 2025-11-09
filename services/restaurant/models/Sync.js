import { sequelize } from '../config/db.js'
import Restaurant from './Restaurant.js';
import Category from './category.js';
import Subcategory from './Subcategory.js';
import Dish from './Dish.js';

const syncDB = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("🎉 All tables synced successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error syncing tables:", err);
    process.exit(1);
  }
};

syncDB();
