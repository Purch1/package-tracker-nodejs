import Joi from 'joi';
import { guidSchema, latitudeSchema, longitudeSchema } from './lib/common-schema.js';

export const createPackageValidator = Joi.object({
  body: Joi.object({
    package_id: Joi.string(),
    active_delivery_id: Joi.string().allow(null),
    description: Joi.string().allow(null),
    weight: Joi.number().required(),
    width: Joi.number().required(),
    height: Joi.number().required(),
    depth: Joi.number().required(),
    from_name: Joi.string().required(),
    from_address: Joi.string().required(),
    from_location: Joi.object({
      lat: latitudeSchema.required(),
      lng: longitudeSchema.required()
    }).required(),
    to_name: Joi.string().required(),
    to_address: Joi.string().required(),
    to_location: Joi.object({
      lat: latitudeSchema.required(),
      lng: longitudeSchema.required()
    }).required()
  })
});

export const updatePackageValidator = Joi.object({
  body: Joi.object({
    description: Joi.string().allow(null),
    weight: Joi.number(),
    width: Joi.number(),
    height: Joi.number(),
    depth: Joi.number(),
    from_name: Joi.string(),
    from_address: Joi.string(),
    from_location: Joi.object({
      lat: latitudeSchema,
      lng: longitudeSchema
    }),
    to_name: Joi.string(),
    to_address: Joi.string(),
    to_location: Joi.object({
      lat: latitudeSchema,
      lng: longitudeSchema
    })
  }),
  params: Joi.object({
    id: guidSchema.label('Package id').required(),
  }),
});


export const updateStatusValidator = Joi.object({
  body: Joi.object({
    status: Joi.string()
      .valid('pending', 'shipped', 'in_transit', 'delivered', 'canceled')
      .required()
  }),
  params: Joi.object({
    id: guidSchema.label('Package id').required(),
  }),
});