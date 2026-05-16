const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Database connection - Serverless Optimized
const connectDB = async () => {
  // If already connected or connecting, don't create a new connection
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/smartcampus-erp';
  
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // Timeout quickly if DB is unreachable
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

// Middleware to ensure DB connection before handling requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: 'Database connection failed', 
      error: error.message,
      hint: !process.env.MONGODB_URI ? "MONGODB_URI environment variable is missing" : "Check MongoDB Atlas Network Access and credentials"
    });
  }
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/students', require('./routes/students'));
app.use('/api/faculty', require('./routes/faculty'));
app.use('/api/attendance', require('./routes/attendance'));
app.use('/api/exams', require('./routes/exams'));
app.use('/api/fees', require('./routes/fees'));
app.use('/api/notices', require('./routes/notices'));
app.use('/api/timetable', require('./routes/timetable'));
app.use('/api/library', require('./routes/library'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'SmartCampus ERP Server is running' });
});

// Database health check (for debugging)
app.get('/api/db-health', (req, res) => {
  res.json({ 
    hasUri: !!process.env.MONGODB_URI,
    readyState: mongoose.connection.readyState,
    uriPreview: process.env.MONGODB_URI ? `${process.env.MONGODB_URI.substring(0, 15)}...` : 'Not Set'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;