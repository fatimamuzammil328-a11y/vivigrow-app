const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', 'backend', '.env') });

async function checkDB() {
    try {
        const MONGODB_URI = process.env.MONGODB_URI;
        console.log('Connecting to:', MONGODB_URI);
        await mongoose.connect(MONGODB_URI);
        console.log('Connected!');
        
        const Product = mongoose.model('Product', new mongoose.Schema({}, { strict: false }));
        const products = await Product.find({});
        
        console.log('Total Products in DB:', products.length);
        products.forEach((p, i) => {
            console.log(`${i+1}. ${p.name}`);
        });
        
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

checkDB();
