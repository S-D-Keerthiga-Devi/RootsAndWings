import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Initialize dotenv to load .env variables
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Allow frontend to send requests
app.use(express.json()); // Parse JSON bodies (req.body)

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1); // Exit process with failure
  }
};

// Connect to Database
connectDB();

// Test Route
app.get('/', (req, res) => {
  res.send('Roots & Wings API is Running!');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});