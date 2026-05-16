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

// @desc    Update an existing product (Sirf Admin ke liye)
const updateProduct = async (req, res) => {
    try {
        const { name, category, description, features, price, demoLink } = req.body;

        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Hacker-Proof Safe Fields Update Logic
        product.name = name || product.name;
        product.category = category || product.category;
        product.description = description || product.description;
        product.demoLink = demoLink || product.demoLink;
        product.price = price !== undefined ? Number(price) : product.price;

        // Features array convert karne ka logic (agar frontend se edit karte waqt string aaye)
        if (features !== undefined) {
            let featuresArray = features;
            if (typeof features === 'string') {
                featuresArray = features.split(',').map(f => f.trim());
            }
            product.features = featuresArray;
        }

        // Agar admin ne naye edit mein nayi image upload ki ho
        if (req.file) {
            product.productImage = `/uploads/${req.file.filename}`;
        }

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (error) {
        console.log("UPDATE PRODUCT DATABASE ERROR:", error.message);
        res.status(400).json({ message: 'Invalid data or update failed' });
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

module.exports = { getProducts, createProduct, updateProduct, deleteProduct };