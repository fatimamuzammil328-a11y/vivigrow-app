const express = require('express');
const Dealer = require('../models/Dealer');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const dealers = await Dealer.find().sort({ createdAt: -1 });
        res.json(dealers);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async (req, res) => {
    try {
        const dealer = await Dealer.create(req.body);
        res.status(201).json(dealer);
    } catch (err) { res.status(400).json({ error: err.message }); }
});

router.put('/:id', async (req, res) => {
    try {
        const dealer = await Dealer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(dealer);
    } catch (err) { res.status(400).json({ error: err.message }); }
});

router.delete('/:id', async (req, res) => {
    try {
        await Dealer.findByIdAndDelete(req.params.id);
        res.json({ message: 'Dealer deleted' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
