const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const sparkRoutes = require('./routes/sparkRoutes');
const authRoutes = require('./routes/authRoutes'); // ✅ Make sure this path is correct

require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// ✅ Register API routes
app.use('/api/sparks', sparkRoutes);
app.use('/api/auth', authRoutes); // ✅ This line was missing/commented out

// Default route
app.get('/', (req, res) => {
  res.send('Movira API is running...');
});

// Connect to MongoDB and start the server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));
