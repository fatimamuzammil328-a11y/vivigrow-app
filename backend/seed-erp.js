const mongoose = require('mongoose');
const { Warehouse, Salary, Transport, SalesRecord, ProfitLoss, RawMaterial, Production, ReturnRecord, Safety, TaxRecord } = require('./models/ERPModels');
require('dotenv').config();

const MONGODB_URI = "mongodb://localhost:27017/Agrofertilizers";

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('🌱 Seeding COMPLETE ERP Data...');

        // Clear All
        await Warehouse.deleteMany({});
        await Salary.deleteMany({});
        await Transport.deleteMany({});
        await SalesRecord.deleteMany({});
        await ProfitLoss.deleteMany({});
        await RawMaterial.deleteMany({});
        await Production.deleteMany({});
        await ReturnRecord.deleteMany({});
        await Safety.deleteMany({});
        await TaxRecord.deleteMany({});

        // 1. Warehouse
        await Warehouse.insertMany([
            { location: "Lahore Central", capacity: "5000 Tons", manager: "Ahmad Khan", status: "Available" },
            { location: "Multan Storage", capacity: "2000 Tons", manager: "Sana Malik", status: "Full" }
        ]);

        // 2. Salaries
        await Salary.insertMany([
            { employeeName: "Faizan Ali", amount: 45000, month: "March 2024", status: "Paid" },
            { employeeName: "Aslam Pervez", amount: 35000, month: "March 2024", status: "Pending" }
        ]);

        // 3. Transport
        await Transport.insertMany([
            { vehicleNo: "LZW-4455", driverName: "Babar Azam", destination: "Sargodha", status: "In Transit" },
            { vehicleNo: "MNP-9900", driverName: "Rizwan Shah", destination: "Multan", status: "Delivered" }
        ]);

        // 4. Sales
        await SalesRecord.insertMany([
            { invoiceId: "INV-101", customerName: "Zahid Agri", totalAmount: 125000, paymentStatus: "Paid" },
            { invoiceId: "INV-102", customerName: "Modern Farm", totalAmount: 85000, paymentStatus: "Credit" }
        ]);

        // 5. Profit & Loss
        await ProfitLoss.insertMany([
            { month: "Feb 2024", revenue: 2500000, expenses: 1800000, netProfit: 700000 },
            { month: "Jan 2024", revenue: 2100000, expenses: 1600000, netProfit: 500000 }
        ]);

        // 6. Raw Materials
        await RawMaterial.insertMany([
            { materialName: "Phosphorous Rock", supplier: "Global Agri Co", quantity: "100 Tons", cost: 1200000 },
            { materialName: "Sulphuric Acid", supplier: "Chem Industries", quantity: "50 Tons", cost: 450000 }
        ]);

        // 7. Production
        await Production.insertMany([
            { batchNo: "BATCH-001", productName: "Premium Urea", quantityProduced: "200 Bags", status: "Completed" },
            { batchNo: "BATCH-002", productName: "DAP Pro", quantityProduced: "150 Bags", status: "In Process" }
        ]);

        // 8. Returns
        await ReturnRecord.insertMany([
            { orderId: "ORD-998", reason: "Damaged Packaging", refundAmount: 2500, status: "Processed" },
            { orderId: "ORD-776", reason: "Incorrect Grade", refundAmount: 4200, status: "Pending" }
        ]);

        // 9. Safety & Compliance
        await Safety.insertMany([
            { inspector: "Dr. Kamran", result: "Passed", remarks: "All chemical storage units are secure." },
            { inspector: "Engr. Tahir", result: "Warning", remarks: "Ventilation in Section B needs repair." }
        ]);

        // 10. Taxes
        await TaxRecord.insertMany([
            { year: "2023", taxType: "Income Tax", amountPaid: 450000, fillingDate: new Date("2023-12-15") },
            { year: "2023", taxType: "Sales Tax", amountPaid: 120000, fillingDate: new Date("2024-01-10") }
        ]);

        console.log('✅ ALL 13 ERP Modules Seeded Successfully!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seed();
