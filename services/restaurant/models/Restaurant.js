import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Restaurant = sequelize.define('Restaurant', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rest_name: { type: DataTypes.STRING, allowNull: false },
  rest_address: { type: DataTypes.TEXT, allowNull: false },
  rest_coords: { type: DataTypes.GEOMETRY('POINT') },
  res_reviews: { type: DataTypes.JSONB },
  res_policy: { type: DataTypes.TEXT }, 
  rest_opening_time: { type: DataTypes.TIME },
  rest_closing_time: { type: DataTypes.TIME },
  rest_mobile: { type: DataTypes.STRING(20) },
  rest_email: { type: DataTypes.STRING(100) },
  rest_legal_name: { type: DataTypes.STRING(255) },
  rest_fssai_no: { type: DataTypes.STRING(50) },
  rest_images: { type: DataTypes.ARRAY(DataTypes.TEXT) },
  rest_delivery: { type: DataTypes.BOOLEAN },
  rest_dining: { type: DataTypes.BOOLEAN },
  rest_famous_dish: { type: DataTypes.TEXT },
  rest_offers: { type: DataTypes.JSONB }
}, {
  tableName: 'restaurants',
  timestamps: true
});

export default Restaurant;
