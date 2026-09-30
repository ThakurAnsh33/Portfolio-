import mongoose from 'mongoose';

const resumeDownloadSchema = new mongoose.Schema(
  {
    ipAddress: {
      type: String,
      default: null,
    },
    userAgent: {
      type: String,
      default: null,
    },
    referrer: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: 'resume_downloads',
  }
);

resumeDownloadSchema.index({ createdAt: -1 });

export const ResumeDownload = mongoose.model('ResumeDownload', resumeDownloadSchema);

