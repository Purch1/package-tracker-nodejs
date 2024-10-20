import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const packageSchema = new Schema(
  {
    package_id: {
      type: String,
      required: true,
      unique: true,
      default: () => uuidv4()
    },
    active_delivery_id: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    weight: {
      type: Number, 
      required: true,
    },
    width: {
      type: Number, 
      required: true,
    },
    height: {
      type: Number, 
      required: true,
    },
    depth: {
      type: Number, 
      required: true,
    },
    from_name: {
      type: String,
      required: true,
    },
    from_address: {
      type: String,
      required: true,
    },
    from_location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    to_name: {
      type: String,
      required: true,
    },
    to_address: {
      type: String,
      required: true,
    },
    to_location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
  },
  { timestamps: true }
);

// Pre-save hook to ensure package_id is set
packageSchema.pre('save', function (next) {
  if (!this.package_id) {
    this.package_id = uuidv4();
  }
  next();
});
export const Package = model('Package', packageSchema);
