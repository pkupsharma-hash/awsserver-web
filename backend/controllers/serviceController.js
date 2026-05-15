const Service = require('../models/Service');

// @desc    Get all active services
const getServices = async (req, res) => {
    try {
        const services = await Service.find({ isActive: true });
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Add a new service
const createService = async (req, res) => {
    try {
        const { title, category, shortDescription, fullDescription, priceStartingFrom } = req.body;
        
        const iconOrImage = req.file ? `/uploads/${req.file.filename}` : '';

        const service = new Service({
            title,
            category,
            shortDescription,
            fullDescription,
            priceStartingFrom,
            iconOrImage
        });

        const createdService = await service.save();
        res.status(201).json(createdService);
    } catch (error) {
        // ASLI ERROR YAHAN PRINT HOGA
        console.log("DATABASE ERROR:", error.message);
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a service
const deleteService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (service) {
            await service.deleteOne();
            res.json({ message: 'Service removed successfully' });
        } else {
            res.status(404).json({ message: 'Service not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getServices, createService, deleteService };