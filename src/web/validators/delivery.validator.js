import Joi from 'joi';
import { guidSchema, latitudeSchema, longitudeSchema, objectIdSchema } from './lib/common-schema.js';
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
    })
  }),
  params: Joi.object({
    id: guidSchema.label('Delivery id').required()
  })
});

export const updateDeliveryStatusValidator = Joi.object({
  body: Joi.object({
    status: Joi.string(),
  }),
  params: Joi.object({
    id: guidSchema.label('Delivery id').required()
  })
});
