import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { DeliveryStatus, deliveryStatuses } from '../../utils/helpers/deliveries.helpers.js';

const deliverySchema = new Schema(
  {
    delivery_id: {
      type: String,
      required: true,
      unique: true,
      default: () => uuidv4()
    },
    package_id: {
      type: String,
      required: true
    },
    pickup_time: {
      type: Date,
      default: null
    },
    start_time: {
      type: Date,
      default: null
    },
    end_time: {
      type: Date,
      default: null
    },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    },
    status: {
      type: String,
      enum: deliveryStatuses,
      default: DeliveryStatus.OPEN
    }
  },
  { timestamps: true }
);

// Pre-save hook to ensure delivery_id is set
deliverySchema.pre('save', function (next) {
  if (!this.delivery_id) {
    this.delivery_id = uuidv4();
  }
  next();
});

export const Delivery = model('Delivery', deliverySchema);
