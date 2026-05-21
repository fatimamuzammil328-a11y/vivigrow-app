const mongoose = require('mongoose');
const Dealer = require('./models/Dealer');
require('dotenv').config();

const MONGODB_URI = "mongodb://localhost:27017/Agrofertilizers";

const dealers = [
    { name: "Agri-Traders Lahore", location: "Ferozepur Road, Lahore", contact: "0300-1234567", status: "Active" },
    { name: "Bio-Solutions Multan", location: "Vehari Road, Multan", contact: "0311-9876543", status: "Active" },
    { name: "Fertilizer Hub Faisalabad", location: "Sargodha Road, Faisalabad", contact: "0322-5554433", status: "Pending" },
    { name: "Green Growers Sialkot", location: "Kashmir Road, Sialkot", contact: "0345-1112233", status: "Inactive" }
];

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('🌱 Connecting to database for seeding dealers...');
        await Dealer.deleteMany({});
        await Dealer.insertMany(dealers);
        console.log('✅ Dealers seeded successfully!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seed();
