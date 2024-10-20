import { Schema, model } from 'mongoose';

import { UserRole, userRoles } from '../../utils/helpers/user.helpers.js';

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },

    lastName: {
      type: String,
      required: true,
      trim: true
    },

    role: {
      type: String,
      required: true,
      enum: userRoles,
      default: UserRole.CUSTOMER
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    }
  },

  {
    timestamps: true
  }
);

export const User = model('User', userSchema);
