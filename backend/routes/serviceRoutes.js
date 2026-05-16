const express = require('express');
const router = express.Router();
const { getServices, createService, deleteService, updateService } = require('../controllers/serviceController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public route - Koi bhi website par services dekh sakta hai
router.get('/', getServices);

// Admin Protected Routes - Sirf admin add/delete/update kar sakta hai
router.post('/', protect, upload.single('image'), createService);
router.put('/:id', protect, upload.single('image'), updateService); // ✨ Naya Update Route Add Ho Gaya
router.delete('/:id', protect, deleteService);

module.exports = router;