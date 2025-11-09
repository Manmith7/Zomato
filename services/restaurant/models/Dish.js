import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import Restaurant from './Restaurant.js';
import Category from './category.js';
import Subcategory from './Subcategory.js';

const Dish = sequelize.define('Dish', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  dish_name: { type: DataTypes.STRING(255), allowNull: false },
  price: { type: DataTypes.DECIMAL(10,2) },
  is_veg: { type: DataTypes.BOOLEAN },
  description: { type: DataTypes.TEXT },
  restaurant_id: {
    type: DataTypes.INTEGER,
    references: { model: Restaurant, key: 'id' },
    onDelete: 'CASCADE'
  },
  category_id: {
    type: DataTypes.INTEGER,
    references: { model: Category, key: 'id' }
  },
  subcategory_id: {
    type: DataTypes.INTEGER,
    references: { model: Subcategory, key: 'id' }
  }
}, {
  tableName: 'dishes',
  timestamps: true
});

// Associations
Restaurant.hasMany(Dish, { foreignKey: 'restaurant_id', onDelete: 'CASCADE' });
Dish.belongsTo(Restaurant, { foreignKey: 'restaurant_id' });

Category.hasMany(Dish, { foreignKey: 'category_id' });
Dish.belongsTo(Category, { foreignKey: 'category_id' });

Subcategory.hasMany(Dish, { foreignKey: 'subcategory_id' });
Dish.belongsTo(Subcategory, { foreignKey: 'subcategory_id' });

export default Dish;
