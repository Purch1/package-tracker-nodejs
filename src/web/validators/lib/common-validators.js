import Joi from 'joi';

export const idValidator = Joi.object({
  params: Joi.object({
    id: Joi.string().guid({ version: ['uuidv4'] }).required()
  })
});