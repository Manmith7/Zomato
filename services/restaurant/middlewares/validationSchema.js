import Joi from 'joi';

export const restaurantSchema = Joi.object({
  rest_name: Joi.string().max(255).required(),
  rest_address: Joi.string().required(),
  rest_coords: Joi.object({
    type: Joi.string().valid('Point').required(),
    coordinates: Joi.array().items(Joi.number()).length(2).required()
  }).optional(),
  res_reviews: Joi.array().items(Joi.object()).optional(), // Assuming JSONB is an array of objects
  res_policy: Joi.string().optional(),
  rest_opening_time: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/).optional(), // HH:MM:SS format
  rest_closing_time: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/).optional(),
  rest_mobile: Joi.string().max(20).optional(),
  rest_email: Joi.string().email().optional(),
  rest_legal_name: Joi.string().max(255).optional(),
  rest_fssai_no: Joi.string().max(50).optional(),
  rest_images: Joi.array().items(Joi.string().uri()).optional(),
  rest_delivery: Joi.boolean().optional(),
  rest_dining: Joi.boolean().optional(),
  rest_famous_dish: Joi.string().optional(),
  rest_offers: Joi.array().items(Joi.object()).optional() // Assuming JSONB is an array of objects
});
