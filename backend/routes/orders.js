const express = require('express');
const Order = require('../models/Order');

const router = express.Router();

// ─── GET /api/orders (all orders – admin) ─────────────────
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ ok: false, error: 'Failed to fetch orders.' });
    }
});

// ─── POST /api/orders (Create new order) ───────────────────
router.post('/', async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.status(201).json({ ok: true, order });
    } catch (err) {
        console.error('Create Order Error:', err.message);
        res.status(500).json({ ok: false, error: 'Failed to place order.' });
    }
});

// ─── GET /api/orders/:orderId (Track order) ────────────────
router.get('/:orderId', async (req, res) => {
    try {
        const order = await Order.findOne({ orderId: req.params.orderId.toUpperCase() });
        if (!order) return res.status(404).json({ ok: false, error: 'Order not found.' });
        res.json({ ok: true, order });
    } catch (err) {
        res.status(500).json({ ok: false, error: 'Failed to track order.' });
    }
});

// ─── PUT /api/orders/:id (Update order) ───────────────────
router.put('/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!order) return res.status(404).json({ ok: false, error: 'Order not found.' });
        res.json(order);
    } catch (err) {
        res.status(500).json({ ok: false, error: 'Failed to update order.' });
    }
});

// ─── DELETE /api/orders/:id (Delete order) ───────────────
router.delete('/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) return res.status(404).json({ ok: false, error: 'Order not found.' });
        res.json({ message: 'Order deleted successfully' });
    } catch (err) {
        res.status(500).json({ ok: false, error: 'Failed to delete order.' });
    }
});

module.exports = router;
