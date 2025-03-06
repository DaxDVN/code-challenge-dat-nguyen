import { NextFunction } from 'express';
import Joi from 'joi';
import { Request, Response } from 'express';

export const theaterValidator = Joi.object({
  theaterId: Joi.number().required(),
  location: Joi.object({
    address: Joi.object({
      street1: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      zipcode: Joi.string().required(),
    }).required(),
    geo: Joi.object({
      type: Joi.string().required(),
      coordinates: Joi.array().items(Joi.number()).required(),
    }).required(),
  }).required(),
});


export const validateBody = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({
        message: 'Invalid request body',
        details: error.details,
      });
      return;
    }
    next();
  };
};