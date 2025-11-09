import jwt, { decode } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { logger } from '../utils/winston.js';

dotenv.config();

export const verifyToken = (req, res, next) => {
  logger.info('Verifying token and role');

  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    logger.warn('No authorization header provided');
    return res.status(403).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET;

  if (!token) {
    logger.warn('Token missing in authorization header');
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      logger.error('Failed to authenticate token', err);
      return res.status(401).json({ message: 'Unauthorized!' });
    }

    logger.info('Token and role verified successfully');
    req.userId = decoded.id;
    req.role = decoded.role
    next();
  });
};
