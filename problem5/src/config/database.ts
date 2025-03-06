import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
// Connect to MongoDB
const DATABASE_URL: string = process.env.MONGO_URI || "";

const connectDatabase = async () => {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error(error);
  }
};

export default connectDatabase;
