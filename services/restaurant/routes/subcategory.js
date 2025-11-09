import express from 'express';
import {
  createSubcategory,
  getAllSubcategories,
  updateSubcategoryById,
  deleteSubcategoryById
} from '../controllers/subcategory.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { verifyRestaurantRole } from '../middlewares/verifyRole.js';

const router = express.Router();

router.post('/', verifyToken,verifyRestaurantRole ,createSubcategory);           // Create
router.get('/', verifyToken,verifyRestaurantRole,getAllSubcategories);         // Get all
router.put('/:id',verifyToken,verifyRestaurantRole, updateSubcategoryById);    // Update
router.delete('/:id',verifyToken,verifyRestaurantRole,deleteSubcategoryById); // Delete

export default router;
