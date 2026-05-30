const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
    location: { type: String, required: true },
    capacity: { type: String, required: true },
    manager: { type: String, required: true },
    status: { type: String, enum: ['Full', 'Available', 'Maintenance'], default: 'Available' }
});
const Warehouse = mongoose.model('Warehouse', warehouseSchema);

const salarySchema = new mongoose.Schema({
    employeeName: { type: String, required: true },
    amount: { type: Number, required: true },
    month: { type: String, required: true },
    status: { type: String, enum: ['Paid', 'Pending'], default: 'Pending' },
    date: { type: Date, default: Date.now }
});
const Salary = mongoose.model('Salary', salarySchema);

const transportSchema = new mongoose.Schema({
    vehicleNo: { type: String, required: true },
    driverName: { type: String, required: true },
    destination: { type: String, required: true },
    status: { type: String, default: 'Available' }
});
const Transport = mongoose.model('Transport', transportSchema);

const salesRecordSchema = new mongoose.Schema({
    invoiceId: { type: String, required: true },
    customerName: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    paymentStatus: { type: String, enum: ['Paid', 'Credit'], default: 'Paid' },
    date: { type: Date, default: Date.now }
});
const SalesRecord = mongoose.model('SalesRecord', salesRecordSchema);

const profitLossSchema = new mongoose.Schema({
    month: { type: String, required: true },
    revenue: { type: Number, required: true },
    expenses: { type: Number, required: true },
    netProfit: { type: Number, required: true }
});
const ProfitLoss = mongoose.model('ProfitLoss', profitLossSchema);

const rawMaterialSchema = new mongoose.Schema({
    materialName: { type: String, required: true },
    source: { type: String, required: true },
    receivedBy: { type: String, required: true },
    quantity: { type: String, required: true },
    cost: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});
const RawMaterial = mongoose.model('RawMaterial', rawMaterialSchema);

const productionSchema = new mongoose.Schema({
    batchNo: { type: String, required: true },
    productName: { type: String, required: true },
    quantityProduced: { type: String, required: true },
    status: { type: String, enum: ['Completed', 'In Process'], default: 'In Process' }
});
const Production = mongoose.model('Production', productionSchema);

const returnSchema = new mongoose.Schema({
    orderId: { type: String, required: true },
    reason: { type: String, required: true },
    refundAmount: { type: Number, required: true },
    status: { type: String, default: 'Pending' }
});
const ReturnRecord = mongoose.model('Return', returnSchema);

const safetySchema = new mongoose.Schema({
    checkupDate: { type: Date, default: Date.now },
    inspector: { type: String, required: true },
    result: { type: String, required: true },
    remarks: { type: String }
});
const Safety = mongoose.model('Safety', safetySchema);

const taxSchema = new mongoose.Schema({
    year: { type: String, required: true },
    taxType: { type: String, required: true },
    amountPaid: { type: Number, required: true },
    fillingDate: { type: Date, default: Date.now }
});
const TaxRecord = mongoose.model('TaxRecord', taxSchema);

const inventorySchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    sku: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    status: { type: String, default: 'In Stock' }
});
const Inventory = mongoose.model('Inventory', inventorySchema);

const paymentSchema = new mongoose.Schema({
    transactionId: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'PKR' },
    status: { type: String, default: 'Paid' },
    customerEmail: { type: String, required: true },
    date: { type: Date, default: Date.now }
});
const Payment = mongoose.model('Payment', paymentSchema);

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    status: { type: String, default: 'Active' }
});
const Customer = mongoose.model('Customer', customerSchema);

const qualityControlSchema = new mongoose.Schema({
    batchNo: { type: String, required: true },
    inspector: { type: String, required: true },
    score: { type: Number, required: true },
    status: { type: String, default: 'Pass' },
    date: { type: Date, default: Date.now }
});
const QualityControl = mongoose.model('QualityControl', qualityControlSchema);

const machinerySchema = new mongoose.Schema({
    machineName: { type: String, required: true },
    serialNo: { type: String, required: true },
    status: { type: String, default: 'Operational' }
});
const Machinery = mongoose.model('Machinery', machinerySchema);

const invoiceSchema = new mongoose.Schema({
    invoiceId: { type: String, required: true },
    customerName: { type: String, required: true },
    amount: { type: Number, required: true },
    issueDate: { type: Date, default: Date.now },
    dueDate: { type: String, required: true },
    status: { type: String, enum: ['Paid', 'Unpaid', 'Overdue'], default: 'Unpaid' }
});
const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = { 
    Warehouse, Salary, Transport, SalesRecord, ProfitLoss, RawMaterial, Production, ReturnRecord, Safety, TaxRecord,
    Inventory, Payment, Customer, QualityControl, Machinery, Invoice
};
