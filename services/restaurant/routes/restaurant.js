import { Router } from 'express';
import { validateSchema } from '../middlewares/validateSchema.js';
import { restaurantSchema } from '../middlewares/validationSchema.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { registerRestaurant,getAllRestaurants, getRestaurantById,updateRestaurantById, deleteRestaurantById } from '../controllers/restaurant.js';
import { verifyRestaurantRole } from '../middlewares/verifyRole.js';

const router = Router();

router.post('/', verifyToken,verifyRestaurantRole, validateSchema(restaurantSchema), registerRestaurant);

router.get('/', verifyToken, getAllRestaurants);

router.get('/:id',verifyToken,getRestaurantById);

router.put('/:id', verifyToken,verifyRestaurantRole,updateRestaurantById);

router.delete('/:id', verifyToken,verifyRestaurantRole,deleteRestaurantById);

export default router;
