const express = require('express');
const { 
    Warehouse, Salary, Transport, SalesRecord, ProfitLoss, RawMaterial, Production, ReturnRecord, Safety, TaxRecord,
    Inventory, Payment, Customer, QualityControl, Machinery, Invoice
} = require('../models/ERPModels');
const router = express.Router();

const createERPRoute = (Model) => {
    const r = express.Router();
    r.get('/', async (req, res) => {
        try { const data = await Model.find().sort({ _id: -1 }); res.json(data); }
        catch (err) { res.status(500).json({ error: err.message }); }
    });
    r.post('/', async (req, res) => {
        try { const data = await Model.create(req.body); res.status(201).json(data); }
        catch (err) { res.status(400).json({ error: err.message }); }
    });
    r.put('/:id', async (req, res) => {
        try { const data = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json(data); }
        catch (err) { res.status(400).json({ error: err.message }); }
    });
    r.delete('/:id', async (req, res) => {
        try { await Model.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); }
        catch (err) { res.status(500).json({ error: err.message }); }
    });
    return r;
};

router.use('/warehouse', createERPRoute(Warehouse));
router.use('/salaries', createERPRoute(Salary));
router.use('/transport', createERPRoute(Transport));
router.use('/sales', createERPRoute(SalesRecord));
router.use('/profitloss', createERPRoute(ProfitLoss));
router.use('/rawmaterials', createERPRoute(RawMaterial));
router.use('/production', createERPRoute(Production));
router.use('/returns', createERPRoute(ReturnRecord));
router.use('/safety', createERPRoute(Safety));
router.use('/taxes', createERPRoute(TaxRecord));
router.use('/inventory', createERPRoute(Inventory));
router.use('/payments', createERPRoute(Payment));
router.use('/customers', createERPRoute(Customer));
router.use('/qualitycontrol', createERPRoute(QualityControl));
router.use('/machinery', createERPRoute(Machinery));
router.use('/invoices', createERPRoute(Invoice));

module.exports = router;
