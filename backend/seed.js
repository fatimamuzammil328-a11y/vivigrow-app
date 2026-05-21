/**
 * Seed Script — seeds initial products into MongoDB
 * Run with: node seed.js
 */
const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('./models/Product');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vivigrow';

const initialProducts = [
    {
        name: 'GoldHarvest NPK 20-20-20',
        cat: 'All-Purpose',
        price: 'PKR 2,400',
        per: 'per 50kg bag',
        desc: 'Balanced macro-nutrient formula for wheat, rice, and vegetable crops across all soil types.',
        badge: 'Best Seller',
        emoji: '🌿',
        imgClass: ''
    },
    {
        name: 'NitroMax Pro 46-0-0',
        cat: 'Nitrogen Series',
        price: 'PKR 3,100',
        per: 'per 50kg bag',
        desc: 'High-concentration urea for rapid vegetative growth and rich green colour in cereal crops.',
        badge: 'New',
        emoji: '🌾',
        imgClass: 'p2'
    },
    {
        name: 'BioRoot Mycorrhizal',
        cat: 'Bio-Organic',
        price: 'PKR 1,850',
        per: 'per 25kg bag',
        desc: 'Microbial inoculant enhancing root surface area by up to 700% for superior water uptake.',
        badge: 'Organic',
        emoji: '💧',
        imgClass: 'p3'
    }
];

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing products
        await Product.deleteMany({});
        console.log('🗑️  Cleared old products');

        // Insert new products
        const inserted = await Product.insertMany(initialProducts);
        console.log(`🌱 Seeded ${inserted.length} products successfully!`);

        inserted.forEach(p => {
            console.log(`   ${p.emoji} ${p.name} — ${p.price}`);
        });

        await mongoose.disconnect();
        console.log('\n✅ Done! Database seeded.');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seed Error:', err.message);
        process.exit(1);
    }
}

seed();
