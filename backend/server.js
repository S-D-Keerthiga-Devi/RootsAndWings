import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import adoptionRoutes from './routes/AdoptionRoutes.js';
import router from './routes/rootsRoutes.js';

// Initialize dotenv to load .env variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: ["https://roots-and-wings-lilac.vercel.app", "http://localhost:5173"], // Allow your Vercel app and local dev
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true // Allow cookies/headers if needed
}));
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
app.use('/api/users', userRoutes);
app.use('/api/adoption', adoptionRoutes);

app.use('/api/roots', router);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});