const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dns = require('dns');

// Fix for MongoDB Atlas "querySrv ECONNREFUSED" on some ISPs
dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        console.log('  ⏳  Connecting to MongoDB Atlas...');
        
        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
        });

        console.log('');
        console.log('  ✅  Connected Successfully!');
        console.log(`  📦  Status: Connected to Cluster`);
        console.log('');
    } catch (err) {
        console.error('');
        console.error('  ❌  Connection Error:', err.message);
        
        console.warn('  ⚠️  Trying to connect to local database...');
        try {
            await mongoose.connect('mongodb://localhost:27017/Agrofertilizers');
            console.log('  ✅  Connected to local fallback.');
        } catch (localErr) {
            console.error('  ❌  Local fallback also failed.');
        }
        
        console.log('');
    }
};

connectDB();

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
