require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Basic Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Backend is running successfully.' });
});

// Routes
const authRoutes = require('./routes/authRoutes');
const analysisRoutes = require('./routes/analysisRoutes');
const chatRoutes = require('./routes/chatRoutes');

app.use('/api/auth', authRoutes);
app.use('/api', analysisRoutes);
app.use('/api', chatRoutes);

// Database Connection
const MONGO_URI = process.env.MONGO_DB_URI || process.env.MONGO_URI || process.env.MONGODB_URI;

if (!MONGO_URI) {
  console.warn("⚠️  WARNING: No MONGO_URI found in .env file. Running without database connection.");
  app.listen(PORT, () => {
    console.log(`🚀 MedicAi basic backend is running on port ${PORT} (without DB)!`);
  });
} else {
  mongoose.connect(MONGO_URI)
    .then(() => {
      console.log('🟢 Successfully connected to MongoDB Atlas!');
      app.listen(PORT, () => {
        console.log(`🚀 MedicAi basic backend is running on port ${PORT}!`);
      });
    })
    .catch((error) => {
      console.error('🔴 Error connecting to MongoDB:', error.message);
      process.exit(1);
    });
}
