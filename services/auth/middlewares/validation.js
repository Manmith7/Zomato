// middlewares/validation.js
import Joi from 'joi';

const registerSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be valid',
    'string.empty': 'Email is required',
  }),
  mobile: Joi.string().required().messages({
    'string.empty': 'Mobile number is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters',
    'string.empty': 'Password is required',
  }),
  role: Joi.string()
    .valid('customer', 'restaurant', 'delivery-agent', 'admin')
    .required()
    .messages({
      'any.only': 'Role must be one of: customer, restaurant, delivery-agent, admin',
      'string.empty': 'Role is required',
    }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be valid',
    'string.empty': 'Email is required',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required',
  }),
});

const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().required().messages({
    'string.empty': 'Old password is required',
  }),
  newPassword: Joi.string().min(6).required().messages({
    'string.min': 'New password must be at least 6 characters',
    'string.empty': 'New password is required',
  }),
});

export const validateBody = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false }); // validate all errors
  if (error) {
    const errors = error.details.map(detail => detail.message);
    return res.status(400).json({ errors });
  }
  next();
};

export {
  registerSchema,
  loginSchema,
  changePasswordSchema,
};
