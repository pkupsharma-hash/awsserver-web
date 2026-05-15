const Product = require('../models/Product');

// @desc    Get all active products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({ inStock: true });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Add a new product (Sirf Admin ke liye)
const createProduct = async (req, res) => {
    try {
        const { name, category, description, features, price, demoLink } = req.body;
        
        // Image path save karna
        const productImage = req.file ? `/uploads/${req.file.filename}` : '';

        // Features ko array mein convert karna (agar comma separated string aayi ho)
        let featuresArray = features;
        if (typeof features === 'string') {
            featuresArray = features.split(',').map(f => f.trim());
        }

        const product = new Product({
            name,
            category,
            description,
            features: featuresArray,
            price,
            productImage,
            demoLink
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

// @desc    Delete a product (Sirf Admin ke liye)
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.deleteOne();
            res.json({ message: 'Product removed successfully' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getProducts, createProduct, deleteProduct };