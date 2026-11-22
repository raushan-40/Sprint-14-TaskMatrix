const mongoose = require('mongoose');

/**
 * Connects to MongoDB using Mongoose and process.env.MONGODB_URI.
 * Fails safely if MONGODB_URI is missing or connection fails.
 */
async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri || typeof uri !== 'string' || uri.trim() === '') {
    throw new Error('Missing required environment variable: MONGODB_URI');
  }

  try {
    const conn = await mongoose.connect(uri.trim(), {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`MongoDB connected (host: ${conn.connection.host}, db: ${conn.connection.name})`);
    return conn;
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    throw error;
  }
}

module.exports = connectDB;