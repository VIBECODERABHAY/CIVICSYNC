const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Initialize MongoDB
const { connectDB } = require('./db/init');
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Support large base64 images

// Setup API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/official', require('./routes/official'));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('CivicSync API (MongoDB) is running');
});

app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
