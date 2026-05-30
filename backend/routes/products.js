const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// ─── GET /api/products ──────────────────────────────────────
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json(products);
    } catch (err) {
        console.error('Get Products Error:', err.message);
        res.status(500).json({ error: 'Failed to fetch products.' });
    }
});

// ─── GET /api/products/:id ──────────────────────────────────
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found.' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch product.' });
    }
});

// ─── POST /api/products ─────────────────────────────────────
router.post('/', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (err) {
        console.error('Create Product Error:', err.message);
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(e => e.message);
            return res.status(400).json({ error: messages[0] });
        }
        res.status(500).json({ error: 'Failed to create product.' });
    }
});

// ─── PUT /api/products/:id ──────────────────────────────────
router.put('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!product) return res.status(404).json({ error: 'Product not found.' });
        res.json(product);
    } catch (err) {
        console.error('Update Product Error:', err.message);
        res.status(500).json({ error: 'Failed to update product.' });
    }
});

// ─── DELETE /api/products/:id ───────────────────────────────
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found.' });
        res.json({ message: 'Product deleted successfully.' });
    } catch (err) {
        console.error('Delete Product Error:', err.message);
        res.status(500).json({ error: 'Failed to delete product.' });
    }
});

module.exports = router;
