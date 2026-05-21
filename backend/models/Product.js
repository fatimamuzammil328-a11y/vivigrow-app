const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true
    },
    cat: {
        type: String,
        required: [true, 'Category is required'],
        trim: true
    },
    price: {
        type: String,
        required: [true, 'Price is required']
    },
    per: {
        type: String,
        default: 'per 50kg bag'
    },
    desc: {
        type: String,
        default: ''
    },
    badge: {
        type: String,
        default: 'New'
    },
    emoji: {
        type: String,
        default: '🌿'
    },
    imgClass: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);
