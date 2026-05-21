/**
 * Seed All Collections Script - 6 Products with Premium Images
 */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
require('dotenv').config({ path: path.join(__dirname, '.env') });

const Product = require('./models/Product');
const User = require('./models/User');
const Order = require('./models/Order');
const Review = require('./models/Review');

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/Agrofertilizers";

const products = [
    {
        name: "GoldHarvest NPK 20-20-20",
        cat: "All-Purpose",
        price: "PKR 2,400",
        per: "per 50kg bag",
        desc: "Balanced macro-nutrient formula for wheat, rice, and vegetable crops across all soil types.",
        badge: "Best Seller",
        emoji: "🌿",
        imgClass: "",
        image: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&q=80&w=400&h=400"
    },
    {
        name: "NitroMax Pro 46-0-0",
        cat: "Nitrogen Series",
        price: "PKR 3,100",
        per: "per 50kg bag",
        desc: "High-concentration urea for rapid vegetative growth and rich green colour in cereal crops.",
        badge: "New",
        emoji: "🌾",
        imgClass: "p2",
        image: "https://images.unsplash.com/photo-1599818818820-205d5272a0f8?auto=format&fit=crop&q=80&w=400&h=400"
    },
    {
        name: "BioRoot Mycorrhizal",
        cat: "Bio-Organic",
        price: "PKR 1,850",
        per: "per 25kg bag",
        desc: "Microbial inoculant enhancing root surface area by up to 700% for superior water uptake.",
        badge: "Organic",
        emoji: "💧",
        imgClass: "p3",
        image: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&q=80&w=400&h=400"
    },
    {
        name: "PhosGrow DAP 18-46-0",
        cat: "Phosphorus Series",
        price: "PKR 3,400",
        per: "per 50kg bag",
        desc: "Essential phosphorus fertilizer to stimulate early root growth and accelerate crop maturity.",
        badge: "Popular",
        emoji: "🌱",
        imgClass: "p4",
        image: "https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?auto=format&fit=crop&q=80&w=400&h=400"
    },
    {
        name: "PotashPlus Premium",
        cat: "Potassium Series",
        price: "PKR 2,900",
        per: "per 50kg bag",
        desc: "Enhances disease resistance, improves fruit/grain quality, and increases overall crop yield.",
        badge: "Limited",
        emoji: "🍀",
        imgClass: "p5",
        image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=400&h=400"
    },
    {
        name: "ZincoActive Plus",
        cat: "Micronutrients",
        price: "PKR 1,200",
        per: "per unit",
        desc: "Highly chelated Zinc formulation to correct deficiencies and boost chlorophyll production.",
        badge: "Sale",
        emoji: "🧪",
        imgClass: "",
        image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=400&h=400"
    }
];

const reviews = [
    { userName: 'Tariq Ali', userRole: 'Wheat Farmer', rating: 5, comment: 'Switched to GoldHarvest NPK and saw a 42% increase in yield!', location: 'Punjab' },
    { userName: 'Usman Jamil', userRole: 'Rice Farmer', rating: 5, comment: 'BioRoot transformed my rice paddies. Soil is healthier now.', location: 'Sindh' }
];

async function seedAll() {
    try {
        console.log('⏳ Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Products
        await Product.deleteMany({});
        await Product.insertMany(products);
        console.log('📦 Seeded 6 Premium Products');

        // Users (Ensure Admin, Dealer, and Farmer exist for testing)
        await User.deleteMany({});
        const hashedAdminPw = await bcrypt.hash('admin123', 10);
        await User.create({ name: 'Executive Admin', email: 'admin@vivigrow.com', password: 'admin123', role: 'admin' });
        
        await User.create({ name: 'Malik Agro Dealers', email: 'dealer@vivigrow.com', password: 'dealer123', role: 'dealer' });
        await User.create({ name: 'Chaudhary Farms', email: 'farmer@vivigrow.com', password: 'farmer123', role: 'farmer' });
        console.log('👤 Seeded test accounts:');
        console.log('   - Admin:  admin@vivigrow.com / admin123');
        console.log('   - Dealer: dealer@vivigrow.com / dealer123');
        console.log('   - Farmer: farmer@vivigrow.com / farmer123');

        // Reviews
        await Review.deleteMany({});
        await Review.insertMany(reviews);
        console.log('⭐️ Seeded Reviews');

        // Sample Order
        await Order.deleteMany({});
        await Order.create({
            orderId: 'VG-SEEDEX',
            items: [{ name: 'GoldHarvest NPK 20-20-20', qty: 2, price: 'PKR 2,400', emoji: '🌿' }],
            totalAmount: 4800,
            paymentMethod: 'Credit Card',
            status: 'SUCCESSFUL (PAID)'
        });
        console.log('🛒 Seeded Sample Order (VG-SEEDEX)');

        console.log('\n🚀 ALL VIVIGROW DATA SEEDED SUCCESSFULLY!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seed Error:', err.message);
        process.exit(1);
    }
}

seedAll();
