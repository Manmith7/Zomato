import { DataTypes } from 'sequelize';
import {sequelize} from '../config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,  
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,      
    validate: {
      isEmail: true,   
    },
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role:{
    type: DataTypes.ENUM('customer', 'restaurant', 'delivery-agent', 'admin'),
    allowNull: false,
    defaultValue: 'customer'
  },
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'users',  
  timestamps: true,
});

export default User;
