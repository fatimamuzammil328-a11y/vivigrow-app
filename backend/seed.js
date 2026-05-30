/**
 * Seed All Collections Script - All 19 modules seeded with 2 default docs each to prevent empty screens
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
const Dealer = require('./models/Dealer');
const { 
    Warehouse, Salary, Transport, SalesRecord, ProfitLoss, RawMaterial, Production, ReturnRecord, Safety, TaxRecord,
    Inventory, Payment, Customer, QualityControl, Machinery, Invoice
} = require('./models/ERPModels');

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

const dealers = [
    { name: "Punjab Agro Chemicals", location: "Lahore", region: "Punjab", contact: "+92 300 1234567", status: "Active" },
    { name: "Sindh Zarai Markaz", location: "Sukkur", region: "Sindh", contact: "+92 301 9876543", status: "Active" }
];

const warehouses = [
    { location: "Multan Hub", capacity: "10,000 Tons", manager: "Sajid Khan", status: "Available" },
    { location: "Faisalabad Depot", capacity: "5,000 Tons", manager: "Raza Ali", status: "Full" }
];

const salaries = [
    { employeeName: "Ahmed Ali", amount: 45000, month: "May 2026", status: "Paid" },
    { employeeName: "Zainab Bibi", amount: 35000, month: "May 2026", status: "Pending" }
];

const transports = [
    { vehicleNo: "LES-26-890", driverName: "Muhammad Din", destination: "Peshawar", status: "In Transit" },
    { vehicleNo: "MN-12-776", driverName: "Allah Ditta", destination: "Sahiwal", status: "Available" }
];

const salesRecords = [
    { invoiceId: "INV-2026-001", customerName: "Bismillah Farms", totalAmount: 48000, paymentStatus: "Paid" },
    { invoiceId: "INV-2026-002", customerName: "Green Valley Agro", totalAmount: 75000, paymentStatus: "Credit" }
];

const profitLossData = [
    { month: "April 2026", revenue: 1200000, expenses: 850000, netProfit: 350000 },
    { month: "May 2026", revenue: 1500000, expenses: 950000, netProfit: 550000 }
];

const rawMaterials = [
    { materialName: "Phosphate Rock", source: "Hazara Mines", receivedBy: "Supervisor Asif", quantity: "20 Tons", cost: 180000 },
    { materialName: "Ammonia Liquid", source: "Pak-Arab Refinery", receivedBy: "Engr. Noman", quantity: "5,000 Litres", cost: 320000 }
];

const productions = [
    { batchNo: "BATCH-NPK-09", productName: "GoldHarvest NPK 20-20-20", quantityProduced: "500 Bags", status: "Completed" },
    { batchNo: "BATCH-UREA-41", productName: "NitroMax Pro 46-0-0", quantityProduced: "800 Bags", status: "In Process" }
];

const returns = [
    { orderId: "VG-SEEDEX", reason: "Damaged packaging on arrival", refundAmount: 2400, status: "Pending" },
    { orderId: "VG-OLD882", reason: "Wrong product category delivered", refundAmount: 3100, status: "Pending" }
];

const safeties = [
    { inspector: "Dr. Tariq Zaman (OSHA)", result: "Passed", remarks: "All fire exits and ventilation systems in factory area conform to regulations." },
    { inspector: "M. Irfan (EPA)", result: "Passed", remarks: "Waste management and chemical runoff controls are standard." }
];

const taxes = [
    { year: "2024-2025", taxType: "Income Tax", amountPaid: 450000 },
    { year: "2024-2025", taxType: "Sales Tax (GST)", amountPaid: 850000 }
];

const inventories = [
    { itemName: "Empty 50kg Bags", sku: "BAG-50KG-PP", quantity: 15000, price: 45, status: "In Stock" },
    { itemName: "Urea Granules (Unpackaged)", sku: "RAW-UREA-GRN", quantity: 120, price: 28000, status: "In Stock" }
];

const payments = [
    { transactionId: "ch_3Mv6L8H2x", amount: 4800, currency: "PKR", status: "Paid", customerEmail: "farmer@vivigrow.com" },
    { transactionId: "ch_3Mx8F9I5z", amount: 9300, currency: "PKR", status: "Paid", customerEmail: "dealer@vivigrow.com" }
];

const customers = [
    { name: "Imran Khan Niazi Farms", email: "imran@mianwalifarms.com", phone: "+92 300 7766554", address: "Mianwali, Punjab", status: "Active" },
    { name: "Sikandar Hayat", email: "sikandar@tandojam.com", phone: "+92 321 4433221", address: "Tando Jam, Sindh", status: "Active" }
];

const qualityControls = [
    { batchNo: "BATCH-NPK-09", inspector: "Quality Manager Bashir", score: 96, status: "Pass" },
    { batchNo: "BATCH-UREA-41", inspector: "Lab Scientist Ayesha", score: 94, status: "Pass" }
];

const machineries = [
    { machineName: "Rotary Drum Granulator", serialNo: "RDG-9921-A", status: "Operational" },
    { machineName: "Automatic Bagging Machine", serialNo: "ABM-8834-B", status: "Operational" }
];

const invoices = [
    { invoiceId: "INV-2026-101", customerName: "Khan Brothers Farms", amount: 15600, dueDate: "15-Jun-2026", status: "Unpaid" },
    { invoiceId: "INV-2026-102", customerName: "Green Growth Co.", amount: 28900, dueDate: "10-Jun-2026", status: "Paid" }
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
        console.log('👤 Seeded test accounts');

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

        // Dealers
        await Dealer.deleteMany({});
        await Dealer.insertMany(dealers);
        console.log('🤝 Seeded Dealers');

        // ERP Tables
        await Warehouse.deleteMany({});
        await Warehouse.insertMany(warehouses);
        console.log('🏠 Seeded Warehouses');

        await Salary.deleteMany({});
        await Salary.insertMany(salaries);
        console.log('💰 Seeded Salaries');

        await Transport.deleteMany({});
        await Transport.insertMany(transports);
        console.log('🚚 Seeded Transport');

        await SalesRecord.deleteMany({});
        await SalesRecord.insertMany(salesRecords);
        console.log('📊 Seeded Sales Records');

        await ProfitLoss.deleteMany({});
        await ProfitLoss.insertMany(profitLossData);
        console.log('📈 Seeded Profit & Loss data');

        await RawMaterial.deleteMany({});
        await RawMaterial.insertMany(rawMaterials);
        console.log('🧱 Seeded Raw Materials');

        await Production.deleteMany({});
        await Production.insertMany(productions);
        console.log('🏭 Seeded Production logs');

        await ReturnRecord.deleteMany({});
        await ReturnRecord.insertMany(returns);
        console.log('🔄 Seeded Return Records');

        await Safety.deleteMany({});
        await Safety.insertMany(safeties);
        console.log('🛡️ Seeded Safety & Compliance audits');

        await TaxRecord.deleteMany({});
        await TaxRecord.insertMany(taxes);
        console.log('🏛️ Seeded Tax Records');

        await Inventory.deleteMany({});
        await Inventory.insertMany(inventories);
        console.log('📦 Seeded Inventory');

        await Payment.deleteMany({});
        await Payment.insertMany(payments);
        console.log('💳 Seeded Payments');

        await Customer.deleteMany({});
        await Customer.insertMany(customers);
        console.log('👥 Seeded Customers');

        await QualityControl.deleteMany({});
        await QualityControl.insertMany(qualityControls);
        console.log('🧪 Seeded Quality Control audits');

        await Machinery.deleteMany({});
        await Machinery.insertMany(machineries);
        console.log('⚙️ Seeded Machinery logs');

        await Invoice.deleteMany({});
        await Invoice.insertMany(invoices);
        console.log('📄 Seeded Invoices');

        console.log('\n🚀 ALL VIVIGROW DATA SEEDED SUCCESSFULLY WITH 20 MODULES COMPLETED!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seed Error:', err.message);
        process.exit(1);
    }
}

seedAll();
