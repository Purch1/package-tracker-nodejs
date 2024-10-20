import Joi from 'joi';
import { latitudeSchema, longitudeSchema, objectIdSchema } from './lib/common-schema.js';
import { DeliveryStatus, deliveryStatuses } from '../../utils/helpers/deliveries.helpers.js';

export const createDeliveryValidator = Joi.object({
  body: Joi.object({
    package_id: Joi.string().required(),
    location: Joi.object({
      lat: latitudeSchema.required(),
      lng: longitudeSchema.required()
    }).required(),
    status: Joi.string()
      .valid(...deliveryStatuses) 
      .default(DeliveryStatus.OPEN) 
  })
});

export const updateDeliveryValidator = Joi.object({
  body: Joi.object({
    package_id: Joi.string(),
    location: Joi.object({
      lat: latitudeSchema,
      lng: longitudeSchema
    }),
    status: Joi.string()
      .valid(...deliveryStatuses) 
  }), 
  params: Joi.object({
    id: objectIdSchema.label('Delivery id').required(),
  }),
});
