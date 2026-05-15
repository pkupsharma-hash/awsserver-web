const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    features: { type: Array, default: [] },
    price: { type: Number, required: true },
    productImage: { type: String, default: "" },
    demoLink: { type: String, default: "" },
    inStock: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);