import express from 'express';
import {
  createCategory,
  getAllCategories,
  updateCategoryById,
  deleteCategoryById
} from '../controllers/category.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { verifyRestaurantRole } from '../middlewares/verifyRole.js';

const router = express.Router();

router.post('/', verifyToken, verifyRestaurantRole, createCategory);           // Create
router.get('/', verifyToken, getAllCategories);         // Get all
router.put('/:id', verifyToken, verifyRestaurantRole, updateCategoryById);    // Update
router.delete('/:id', verifyToken, verifyRestaurantRole, deleteCategoryById); // Delete

export default router;
