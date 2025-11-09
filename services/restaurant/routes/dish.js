import express from 'express';
import {
  createDish,
  getAllDishes,
  updateDishById,
  deleteDishById
} from '../controllers/dish.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { verifyRestaurantRole } from '../middlewares/verifyRole.js';

const router = express.Router();

router.post('/', verifyToken, verifyRestaurantRole, createDish);           // Create
router.get('/', verifyToken, getAllDishes);          // Get all
router.put('/:id', verifyToken, verifyRestaurantRole, updateDishById);    // Update
router.delete('/:id', verifyToken, verifyRestaurantRole, deleteDishById); // Delete

export default router;
