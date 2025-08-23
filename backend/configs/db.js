// configs/db.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) return;
    mongoose.connection.on('connected', () => console.log('✅ MongoDB connected'));
    await mongoose.connect(process.env.MONGODB_URI, { dbName: 'OneAI' });
  } catch (err) {
    console.error('MongoDB error:', err.message);
    process.exit(1);
  }
};

export default connectDB;
