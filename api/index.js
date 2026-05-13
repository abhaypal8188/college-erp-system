const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet());

// CORS Configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      'http://localhost:3000', // Local development
      'http://localhost:5000', // Local API
      process.env.CLIENT_URL, // Production client URL
      /\.vercel\.app$/, // Allow all Vercel deployments
    ].filter(Boolean); // Remove undefined values

    // Check if the origin is allowed
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (typeof allowedOrigin === 'string') {
        return allowedOrigin === origin;
      }
      // For regex patterns
      return allowedOrigin.test(origin);
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

app.use(cors(corsOptions));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/smartcampus-erp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./auth'));
app.use('/api/students', require('./students'));
app.use('/api/faculty', require('./faculty'));
app.use('/api/attendance', require('./attendance'));
app.use('/api/exams', require('./exams'));
app.use('/api/fees', require('./fees'));
app.use('/api/notices', require('./notices'));
app.use('/api/timetable', require('./timetable'));
app.use('/api/library', require('./library'));

// Health check
const healthHandler = (req, res) => {
  res.json({ status: 'OK', message: 'SmartCampus ERP Server is running' });
};
app.get('/api/health', healthHandler);
app.get('/health', healthHandler);
app.get('/api', (req, res) => {
  res.json({ status: 'OK', message: 'SmartCampus ERP API is available' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// For Vercel serverless functions
module.exports = app;

// For local development
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}