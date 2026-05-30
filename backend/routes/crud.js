const express = require('express');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Review = require('../models/Review');
const Dealer = require('../models/Dealer');
const ERPModels = require('../models/ERPModels');

const router = express.Router();

// Generic CRUD Generator Function
const createCrudRouter = (Model, isOrder = false) => {
    const r = express.Router();
    
    // READ ALL
    r.get('/', async (req, res) => {
        try {
            const data = await Model.find().sort({ createdAt: -1, _id: -1 });
            res.json(data);
        } catch (err) { res.status(500).json({ error: err.message }); }
    });

    // READ SINGLE
    r.get('/:id', async (req, res) => {
        try {
            let data;
            // Order tracking handles string IDs (VG-XXXX)
            if (isOrder && req.params.id.startsWith('VG-')) {
                data = await Model.findOne({ orderId: req.params.id.toUpperCase() });
            } else {
                data = await Model.findById(req.params.id);
            }
            if (!data) return res.status(404).json({ ok: false, error: 'Not found' });
            
            if (isOrder) return res.json({ ok: true, order: data });
            res.json(data);
        } catch (err) { res.status(500).json({ error: err.message }); }
    });

    // CREATE
    r.post('/', async (req, res) => {
        try {
            const data = await Model.create(req.body);
            if (isOrder) return res.status(201).json({ ok: true, order: data });
            res.status(201).json(data);
        } catch (err) {
            if (err.name === 'ValidationError') {
                return res.status(400).json({ error: Object.values(err.errors).map(e => e.message)[0] });
            }
            res.status(400).json({ error: err.message });
        }
    });

    // UPDATE
    r.put('/:id', async (req, res) => {
        try {
            const data = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!data) return res.status(404).json({ error: 'Not found' });
            res.json(data);
        } catch (err) { res.status(400).json({ error: err.message }); }
    });

    // DELETE
    r.delete('/:id', async (req, res) => {
        try {
            await Model.findByIdAndDelete(req.params.id);
            res.json({ ok: true, message: 'Deleted' });
        } catch (err) { res.status(500).json({ error: err.message }); }
    });

    return r;
};

// Mount core modules
router.use('/products', createCrudRouter(Product));
router.use('/orders', createCrudRouter(Order, true));
router.use('/reviews', createCrudRouter(Review));
router.use('/dealers', createCrudRouter(Dealer));

// Mount ERP modules dynamically
router.use('/erp/warehouse', createCrudRouter(ERPModels.Warehouse));
router.use('/erp/salaries', createCrudRouter(ERPModels.Salary));
router.use('/erp/transport', createCrudRouter(ERPModels.Transport));
router.use('/erp/sales', createCrudRouter(ERPModels.SalesRecord));
router.use('/erp/profitloss', createCrudRouter(ERPModels.ProfitLoss));
router.use('/erp/rawmaterials', createCrudRouter(ERPModels.RawMaterial));
router.use('/erp/production', createCrudRouter(ERPModels.Production));
router.use('/erp/returns', createCrudRouter(ERPModels.ReturnRecord));
router.use('/erp/safety', createCrudRouter(ERPModels.Safety));
router.use('/erp/taxes', createCrudRouter(ERPModels.TaxRecord));
router.use('/erp/inventory', createCrudRouter(ERPModels.Inventory));
router.use('/erp/payments', createCrudRouter(ERPModels.Payment));
router.use('/erp/customers', createCrudRouter(ERPModels.Customer));
router.use('/erp/qualitycontrol', createCrudRouter(ERPModels.QualityControl));
router.use('/erp/machinery', createCrudRouter(ERPModels.Machinery));

module.exports = router;
