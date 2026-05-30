const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, name: user.name, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};

router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ ok: false, error: 'An account with this email already exists.' });
        }

        const normalizedRole = (role || 'farmer').toLowerCase();
        const user = await User.create({ name, email, password, role: normalizedRole });

        const token = generateToken(user);

        res.status(201).json({
            ok: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        console.error('Register Error:', err.message);
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(e => e.message);
            return res.status(400).json({ ok: false, error: messages[0] });
        }
        res.status(500).json({ ok: false, error: 'Server error. Please try again.' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({ ok: false, error: 'Incorrect email or password.' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ ok: false, error: 'Incorrect email or password.' });
        }

        const token = generateToken(user);

        res.json({
            ok: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        console.error('Login Error:', err.message);
        res.status(500).json({ ok: false, error: 'Server error. Please try again.' });
    }
});

router.get('/me', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ ok: false, error: 'No token provided.' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(404).json({ ok: false, error: 'User not found.' });
        }

        res.json({
            ok: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        res.status(401).json({ ok: false, error: 'Invalid or expired token.' });
    }
});



router.get('/users', async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (err) {
        res.status(500).json({ ok: false, error: 'Failed to fetch users.' });
    }
});

router.post('/users', async (req, res) => {
    try {
        const user = await User.create(req.body);
        const userObj = user.toObject();
        delete userObj.password;
        res.status(201).json(userObj);
    } catch (err) {
        res.status(400).json({ ok: false, error: err.message });
    }
});

router.put('/users/:id', async (req, res) => {
    try {
        const updates = { ...req.body };
        if (updates.password && updates.password.trim() !== '') {
            const salt = await bcrypt.genSalt(10);
            updates.password = await bcrypt.hash(updates.password, salt);
        } else {
            delete updates.password;
        }
        const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
        if (!user) return res.status(404).json({ ok: false, error: 'User not found.' });
        res.json(user);
    } catch (err) {
        res.status(400).json({ ok: false, error: err.message });
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ ok: false, error: 'User not found.' });
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ ok: false, error: err.message });
    }
});

module.exports = router;
