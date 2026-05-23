import mongoose from 'mongoose';
import logger from './logger.js';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });

    logger.info({
      message: 'MongoDB Connected',
      host: conn.connection.host,
      database: conn.connection.name,
    });

    return conn;
  } catch (error) {
    logger.error({
      message: 'MongoDB Connection Error',
      error: error.message,
      stack: error.stack,
    });
    process.exit(1);
  }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  logger.warn('MongoDB disconnected');
});

mongoose.connection.on('error', (error) => {
  logger.error({ message: 'MongoDB error', error: error.message });
});

export default connectDB;
