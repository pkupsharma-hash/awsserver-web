const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Security & Middleware
app.use(helmet()); 
app.use(cors());
app.use(express.json()); 
app.use('/uploads', express.static('uploads'));

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/products', require('./routes/productRoutes')); // Ye nayi line add ho gayi

// Test Route
app.get('/', (req, res) => {
  res.send('awsserver.online Secure API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});