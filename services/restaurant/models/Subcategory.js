import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import Category from './category.js';

const Subcategory = sequelize.define('Subcategory', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  subcategory_name: { type: DataTypes.STRING(100), allowNull: false },
  category_id: {
    type: DataTypes.INTEGER,
    references: { model: Category, key: 'id' },
    onDelete: 'CASCADE'
  }
}, {
  tableName: 'subcategories',
  timestamps: true
});

Category.hasMany(Subcategory, { foreignKey: 'category_id', onDelete: 'CASCADE' });
Subcategory.belongsTo(Category, { foreignKey: 'category_id' });

export default Subcategory;
