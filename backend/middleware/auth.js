const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token;

    // Check agar Request ke Header mein Token hai
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            // Token verify karna
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; // Admin ka data save kar liya
            next(); // Aage jane ki permission de di
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };