const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { 
    type: String, 
    required: true
  },
  shortDescription: { type: String, required: true },
  fullDescription: { type: String },
  priceStartingFrom: { type: Number, required: true },
  iconOrImage: { type: String },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);