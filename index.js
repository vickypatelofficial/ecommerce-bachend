const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/product');
const authRoute = require('./routes/auth');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
 .then(() => console.log('MongoDB is successfully connected!'))
 .catch((err) => console.log('MongoDB connection failed: ', err));

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoute);

// Basic Route
app.get('/', (req, res) => {
  res.send('E-commerce Backend is running!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
