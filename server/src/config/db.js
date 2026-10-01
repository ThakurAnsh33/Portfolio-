import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri || (process.env.NODE_ENV === 'production' && uri.includes('127.0.0.1'))) {
    console.log('[MongoDB] No remote MONGODB_URI configured. Running in resilient mode.');
    return;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 4000,
    });
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.warn(`[MongoDB Warning] Could not establish initial connection to MongoDB at ${uri}.`);
    console.warn(`[MongoDB Warning] Detail: ${error.message}`);
    console.warn('[MongoDB Warning] The server is still running in resilient mode. Contact submissions will log to console or wait for MongoDB to reconnect.');
  }

  mongoose.connection.on('disconnected', () => {
    console.log('[MongoDB] Connection lost.');
  });

  mongoose.connection.on('reconnected', () => {
    console.log('[MongoDB] Reconnected successfully.');
  });
};

