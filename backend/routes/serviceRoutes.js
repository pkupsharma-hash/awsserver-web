const express = require('express');
const router = express.Router();
const { getServices, createService, deleteService } = require('../controllers/serviceController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public route - Koi bhi website par services dekh sakta hai
router.get('/', getServices);

// Admin Protected Routes - Sirf admin add/delete kar sakta hai
router.post('/', protect, upload.single('image'), createService);
router.delete('/:id', protect, deleteService);

module.exports = router;