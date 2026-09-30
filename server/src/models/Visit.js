import mongoose from 'mongoose';

const visitSchema = new mongoose.Schema(
  {
    ipAddress: {
      type: String,
      default: null,
    },
    userAgent: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: 'visits',
  }
);

// Index for fast counting and IP lookup
visitSchema.index({ createdAt: -1 });
visitSchema.index({ ipAddress: 1, createdAt: -1 });

export const Visit = mongoose.model('Visit', visitSchema);

