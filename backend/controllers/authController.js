const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Secure Token Generator
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Admin Register (Pehli baar login details banane ke liye)
const registerAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Check agar admin pehle se hai
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'Admin already exists' });

        // Password ko encrypt (hash) karna Hacker-proof banane ke liye
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Naya Admin save karna
        const user = await User.create({ name, email, password: hashedPassword, role: 'admin' });
        if (user) {
            res.status(201).json({
                _id: user.id, name: user.name, email: user.email, token: generateToken(user._id)
            });
        } else {
            res.status(400).json({ message: 'Invalid admin data' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Admin Login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        // Email aur encrypted password check karna
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id, name: user.name, email: user.email, token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Admin Credentials Update (ERROR FIXED 🚀)
const updateCredentials = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required!" });
        }

        // 1. Naye password ko hash (secure) karein
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 2. Direct database me update karein (Bina .save() ki rukawat ke)
        const updatedUser = await User.findOneAndUpdate(
            {}, // Khali bracket ka matlab jo admin pehle mile, use update karo
            { email: email, password: hashedPassword },
            { new: true }
        );

        if (updatedUser) {
            res.json({ message: "Credentials updated successfully" });
        } else {
            res.status(404).json({ message: "Admin user nahi mila" });
        }
    } catch (error) {
        // Agar ab koi error aaya toh VS Code ke Terminal me dikhega
        console.log("UPDATE MEIN YE ERROR AAYA:", error); 
        // Frontend ko bhi asli error message bhejega
        res.status(500).json({ message: error.message || "Server Error" });
    }
};

module.exports = { registerAdmin, loginAdmin, updateCredentials };