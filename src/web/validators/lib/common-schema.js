import Joi from 'joi';
import { joiPassword } from 'joi-password';

export const addressSchema = Joi.string().empty('').trim().label('Address').min(5).max(256);

export const booleanSchema = Joi.boolean().default(false);

export const dateSchema = Joi.date();

export const descriptionSchema = Joi.string().trim().lowercase().label('Description').max(255);

export const emailSchema = Joi.string().label('Email').trim().lowercase().email().max(255);

export const latitudeSchema = Joi.number().min(-90).max(90).label('Latitude');

export const longitudeSchema = Joi.number().min(-180).max(180).label('Longitude');

export const nameSchema = Joi.string().label('Name').trim().min(1).max(255).invalid('null').messages({
  'string.min': '{#label} is too short',
  'string.max': `{#label} is too long`
});

export const objectIdSchema = Joi.alternatives(
  Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .messages({ 'string.pattern.base': 'Invalid {#label}' }),
  Joi.object().keys({
    id: Joi.any(),
    bsontype: Joi.allow('ObjectId')
  })
);

export const passwordSchema = joiPassword
  .string()
  .label('Password')
  .minOfUppercase(1)
  .minOfSpecialCharacters(1)
  .minOfNumeric(1)
  .noWhiteSpaces()
  .min(6)
  .max(128)
  .messages({
    'password.minOfUppercase': '{#label} should contain at least {#min} uppercase character',
    'password.minOfSpecialCharacters': '{#label} should contain at least {#min} special characters',
    'password.minOfNumeric': '{#label} should contain at least {#min} numbers',
    'password.noWhiteSpaces': '{#label} cannot contain white spaces'
  });

export const postalCodeSchema = Joi.string()
  .pattern(/^[A-Za-z0-9\s-]+$/)
  .min(3)
  .max(10)
  .label('Postal Code');

export const phoneNumberSchema = Joi.string()
  .trim()
  .label('Phone number')
  .pattern(/^(\+?234|0)(70|[89][01])\d{8}$/)
  .messages({
    'string.pattern.base': '{#label} is not valid',
    'any.required': '{#label} is required'
  });

export const stringSchema = Joi.string().trim().max(255);
