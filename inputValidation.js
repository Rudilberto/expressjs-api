import Joi from "joi";

export const driverSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  team: Joi.string().min(3).max(100).required(),
  // não obrigatorio com valor default
  points: Joi.number().min(0).max(3000).default(0),
});

export const updateDriverSchema = Joi.object({
  name: Joi.string().min(3).max(100),
  team: Joi.string().min(3).max(100),
  // não obrigatorio com valor default
  points: Joi.number().min(0).max(3000),
}).min(1);
