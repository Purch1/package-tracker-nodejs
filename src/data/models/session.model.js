import { Schema, model } from 'mongoose';

const sessionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },

    token: {
      type: String,
      required: true,
      index: true,
    },

    loginTime: {
      type: Date,
      required: true,
    },

    expires: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export const Session = model('Session', sessionSchema);
