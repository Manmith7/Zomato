import { logger } from "../utils/winston.js";

export const validateSchema = (schema) => {
  return (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Request body cannot be empty" });
    }

    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      logger.warn(`Schema validation failed: ${errors.join(", ")}`);
      return res.status(400).json({ errors });
    }

    req.body = value;
    next();
  };
};
