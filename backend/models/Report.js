const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  severity: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Low',
  },
  category: {
    type: String, // e.g., Pothole, Garbage, Streetlight
    required: true,
  },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  imageUrl: {
    type: String, // We'll store Base64 or a link
    required: true,
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  isEmergency: {
    type: Boolean,
    default: false, // Used for SOS bypass
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Resolved'],
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Report', reportSchema);
