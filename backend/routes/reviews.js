const express = require('express');
const Review = require('../models/Review');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch reviews.' });
    }
});

router.post('/', async (req, res) => {
    try {
        const review = await Review.create(req.body);
        res.status(201).json(review);
    } catch (err) {
        res.status(500).json({ error: 'Failed to post review.' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.id);
        res.json({ ok: true });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete review.' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!review) return res.status(404).json({ error: 'Review not found.' });
        res.json(review);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update review.' });
    }
});

module.exports = router;
