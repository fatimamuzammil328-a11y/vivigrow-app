const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const MONGODB_URI = process.env.MONGODB_URI;

// Cached connection for serverless (Vercel)
let isConnected = false;

const connectDB = async () => {
    if (isConnected && mongoose.connection.readyState === 1) return;
    try {
        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 8000,  // 10s → 8s karo (Vercel ke andar fit ho)
            bufferCommands: false,
        });
        isConnected = true;
    } catch (err) {
        isConnected = false;
        throw err;  // 
    }
};

// Middleware: ensure DB is connected before handling any request
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        res.status(500).json({ error: 'Database connection failed' });
    }
});

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const reviewRoutes = require('./routes/reviews');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/dealers', require('./routes/dealers'));
app.use('/api/erp', require('./routes/erp'));

// DEBUG route – shows raw connection error (remove after testing)
app.get('/api/debug-mongo', async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 10000 });
    res.json({ status: 'ok', message: 'MongoDB connection succeeded' });
  } catch (err) {
    console.error('DEBUG Mongo connection error:', err);
    res.status(500).json({ status: 'error', message: err.message, details: err });
  }
});

app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
        dbName: mongoose.connection.name,
        timestamp: new Date().toISOString()
    });
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '..', 'build')));
    app.get('*', (req, res) => res.sendFile(path.join(__dirname, '..', 'build', 'index.html')));
}

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log('  🚀  Server running on http://localhost:' + PORT);
    });
}

module.exports = app;
