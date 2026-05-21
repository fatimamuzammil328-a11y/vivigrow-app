const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Review = require('./models/Review');
const Dealer = require('./models/Dealer');
const User = require('./models/User');
const { Warehouse, Salary, Transport, SalesRecord, ProfitLoss, RawMaterial, Production, ReturnRecord, Safety, TaxRecord } = require('./models/ERPModels');

const MONGODB_URI = "mongodb://localhost:27017/Agrofertilizers";
const ARTIFACTS_DIR = "C:\\Users\\Fatima\\.gemini\\antigravity\\brain\\19526386-f553-4445-9cfa-bf4b85482776";

async function seedEverything() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('🚀 Starting MEGA SEEDING for ViviGrow...');

        // ── 1. CLEAN ALL COLLECTIONS ──
        await Promise.all([
            Product.deleteMany({}), Order.deleteMany({}), Review.deleteMany({}),
            Dealer.deleteMany({}), User.deleteMany({}), Warehouse.deleteMany({}),
            Salary.deleteMany({}), Transport.deleteMany({}), SalesRecord.deleteMany({}),
            ProfitLoss.deleteMany({}), RawMaterial.deleteMany({}), Production.deleteMany({}),
            ReturnRecord.deleteMany({}), Safety.deleteMany({}), TaxRecord.deleteMany({})
        ]);

        // ── 2. SEED USERS ──
        await User.create([
            { name: "FM Fatima", email: "fatima@vivigrow.com", password: "password123", role: "admin" },
            { name: "Farmer Ali", email: "ali@farm.com", password: "password123", role: "farmer" }
        ]);

        // ── 3. SEED PRODUCTS (WITH IMAGES) ──
        const productImages = [
            "urea_fertilizer_bag_premium_1775742877593.png",
            "dap_fertilizer_bag_premium_1775742958914.png",
            "npk_liquid_bottle_premium_1775742997689.png",
            "organic_bio_fertilizer_1775736018957.png",
            "npk_fertilizer_bag_1775735957864.png",
            "urea_fertilizer_bag_1775735986170.png"
        ];
        const products = [
            { name: "Urea Crystal Premium", cat: "Growth", desc: "Top grade nitrogen for fast greening.", price: "2450", emoji: "🌿" },
            { name: "DAP Root Boost", cat: "Roots", desc: "Best for root and seed development.", price: "3100", emoji: "🌱" },
            { name: "NPK 20-20-20 Liquid", cat: "Foliar", desc: "All-purpose balanced liquid feed.", price: "1800", emoji: "💧" },
            { name: "Bio Organic Mix", cat: "Organic", desc: "Natural compost for sustainable soil.", price: "1550", emoji: "🍂" },
            { name: "NPK Potash Power", cat: "Yield", desc: "High potassium for fruit/grain quality.", price: "2900", emoji: "🌾" },
            { name: "Classic Urea", cat: "Economy", desc: "Reliable and effective nitrogen source.", price: "2150", emoji: "📦" }
        ].map((p, i) => {
            const buf = fs.readFileSync(path.join(ARTIFACTS_DIR, productImages[i]));
            return { ...p, image: `data:image/png;base64,${buf.toString('base64')}` };
        });
        await Product.insertMany(products);

        // ── 4. SEED DEALERS ──
        await Dealer.insertMany([
            { name: "Green Agri Services", location: "Lahore", region: "Punjab", contact: "0300-1234567", status: "Active" },
            { name: "Multan Fertilizer Hub", location: "Multan", region: "South Punjab", contact: "0321-7654321", status: "Active" }
        ]);

        // ── 5. SEED ORDERS & REVIEWS ──
        await Order.create({ orderId: "ORD-5501", customerName: "Farmer Ali", totalAmount: 5200, paymentMethod: "COD", status: "Delivered" });
        await Review.create({ userName: "Farmer Ali", comment: "Excellent results on my wheat crop!", rating: 5 });

        // ── 6. SEED ERP MODULES ──
        await Warehouse.insertMany([{ location: "North Zone Store", capacity: "3000 Bags", manager: "Rizwan", status: "Available" }]);
        await Salary.insertMany([{ employeeName: "Zahid", amount: 40000, month: "March", status: "Paid" }]);
        await Transport.insertMany([{ vehicleNo: "LZW-1122", driverName: "Iqbal", destination: "Lahore", status: "Delivered" }]);
        await SalesRecord.insertMany([{ invoiceId: "INV-001", customerName: "Zahid Agri", totalAmount: 95000, paymentStatus: "Paid" }]);
        await ProfitLoss.insertMany([{ month: "March", revenue: 1500000, expenses: 1100000, netProfit: 400000 }]);
        await RawMaterial.insertMany([{ materialName: "Sulfur", supplier: "ChemCo", quantity: "10 Tons", cost: 300000 }]);
        await Production.insertMany([{ batchNo: "B-99", productName: "Urea", quantityProduced: "100 Bags", status: "Completed" }]);
        await ReturnRecord.insertMany([{ orderId: "ORD-112", reason: "Wrong Product", refundAmount: 2100, status: "Done" }]);
        await Safety.insertMany([{ inspector: "Dr. Nazir", result: "Safe", remarks: "All protocols followed." }]);
        await TaxRecord.insertMany([{ year: "2024", taxType: "GST", amountPaid: 85000 }]);

        console.log('✅ MEGA SEEDING COMPLETE! Everything is populated.');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
seedEverything();
