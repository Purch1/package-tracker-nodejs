import mongoose from 'mongoose';
import logger from '../utils/logger.utils.js';
import config from './app.config.js';

const connectDatabase = async () => {
  const { uri } = config.database;

  try {
    await mongoose.connect(uri, {
    });
    logger.info(`Connected to MongoDB database`);
  } catch (error) {
    logger.error('Failed to connect to MongoDB', error);
    process.exit(1); 
  }
};

process.on('SIGINT', async () => {
  await mongoose.disconnect();
  logger.info('Disconnected from MongoDB');
  process.exit(0);
});

export default connectDatabase;
