// routes/userRoutes.js
import express from 'express';
import { register, login, changePassword } from '../controllers/auth.js';
import { validateBody, registerSchema, loginSchema, changePasswordSchema } from '../middlewares/validation.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get("/",(req,res)=>{
    return res.send("Hello")
})
router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);
router.post('/change-password', authenticateToken, validateBody(changePasswordSchema), changePassword);

export default router;
