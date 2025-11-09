import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import Restaurant from './Restaurant.js';

const Category = sequelize.define('Category', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  category_name: { type: DataTypes.STRING(100), allowNull: false },
  restaurant_id: {
    type: DataTypes.INTEGER,
    references: { model: Restaurant, key: 'id' },
    onDelete: 'CASCADE'
  }
}, {
  tableName: 'categories',
  timestamps: true
});

Restaurant.hasMany(Category, { foreignKey: 'restaurant_id', onDelete: 'CASCADE' });
Category.belongsTo(Restaurant, { foreignKey: 'restaurant_id' });

export default Category;
