const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Product = require('./models/Product');
require('dotenv').config();

const MONGODB_URI = "mongodb://localhost:27017/Agrofertilizers";
const ARTIFACTS_DIR = "C:\\Users\\Fatima\\.gemini\\antigravity\\brain\\19526386-f553-4445-9cfa-bf4b85482776";

const productsData = [
    {
        name: "Premium Urea Fertilizer",
        category: "Soil Health",
        description: "High-quality urea nitrogen for rapid plant growth and deep green foliage.",
        price: 2450,
        imageFile: "urea_fertilizer_bag_premium_1775742877593.png"
    },
    {
        name: "High-Grade DAP",
        category: "Growth Boost",
        description: "Essential Phosphorus and Nitrogen for strong root development and healthy crops.",
        price: 3200,
        imageFile: "dap_fertilizer_bag_premium_1775742958914.png"
    },
    {
        name: "NPK Liquid Boost",
        category: "Liquid Folier",
        description: "Balanced NPK liquid fertilizer for fast absorption and vibrant flowering.",
        price: 1850,
        imageFile: "npk_liquid_bottle_premium_1775742997689.png"
    },
    {
        name: "Organic Bio-Compost",
        category: "Organic",
        description: "100% organic compost enriched with beneficial microbes for sustainable farming.",
        price: 1500,
        imageFile: "organic_bio_fertilizer_1775736018957.png"
    },
    {
        name: "NPK Power Bag",
        category: "Balanced Diet",
        description: "Standard 20-20-20 NPK formula suitable for all types of commercial crops.",
        price: 2800,
        imageFile: "npk_fertilizer_bag_1775735957864.png"
    },
    {
        name: "Standard Urea White",
        category: "Eco Friendly",
        description: "Efficient nitrogen source for field crops and large scale agriculture.",
        price: 2100,
        imageFile: "urea_fertilizer_bag_1775735986170.png"
    }
];

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('🌱 Connecting to database for FINAL product seeding...');
        
        const finalProducts = productsData.map(p => {
            const filePath = path.join(ARTIFACTS_DIR, p.imageFile);
            let base64Image = "";
            if (fs.existsSync(filePath)) {
                const buffer = fs.readFileSync(filePath);
                base64Image = `data:image/png;base64,${buffer.toString('base64')}`;
            }
            return {
                name: p.name,
                cat: p.category,
                desc: p.description,
                price: p.price.toString(), // Price is String in model
                image: base64Image,
                emoji: "📦"
            };
        });

        await Product.deleteMany({});
        await Product.insertMany(finalProducts);
        
        console.log('✅ 6 Real Products with images seeded successfully in MongoDB Compass!');
        process.exit();
    } catch (err) {
        console.error('❌ Seeding Error:', err);
        process.exit(1);
    }
}

seed();
