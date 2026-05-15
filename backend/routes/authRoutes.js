const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin, updateCredentials } = require('../controllers/authController');

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.put('/update', updateCredentials);

module.exports = router;