import Joi from 'joi';

import {
  emailSchema,
  nameSchema,
  passwordSchema,
} from './lib/common-schema.js';
import { userRoles } from '../../utils/helpers/user.helpers.js';

export const signupRequestValidator = Joi.object({
  body: Joi.object({
    firstName: nameSchema.label('First name').required(),
    lastName: nameSchema.label('Last name').required(),
    role: Joi.string().valid(...userRoles).required(),
    email: emailSchema.required(),
    password: passwordSchema.required(),
  }),
});

export const loginRequestValidator = Joi.object({
  body: Joi.object({
    email: emailSchema.required(),
    password: Joi.string().max(128).label('Password').required(),
    role: Joi.string()
      .label('Role')
      .trim()
      .lowercase()
      .valid(...userRoles),
  }),
});