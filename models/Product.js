const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true // This means a product MUST have a name!
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    inStock: {
        type: Boolean,
        default: true // If we don't say otherwise, assume it's in stock
    }
});

module.exports = mongoose.model('Product', productSchema);