const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Secure MongoDB Connection Established!');
    } catch (err) {
        console.error('❌ Database Connection Failed:', err.message);
        process.exit(1); // Agar database fail ho toh server rok do
    }
};

module.exports = connectDB;