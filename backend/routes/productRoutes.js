const express = require('express');
const router = express.Router();
const { getProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public route - Sabhi ke liye
router.get('/', getProducts);

// Admin Protected Routes - Sirf image upload aur add/delete/update ke liye
router.post('/', protect, upload.single('image'), createProduct);
router.put('/:id', protect, upload.single('image'), updateProduct); // ✨ Naya Update Route Add Ho Gaya
router.delete('/:id', protect, deleteProduct);

module.exports = router;