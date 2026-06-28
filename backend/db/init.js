const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { family: 4 });
        console.log('✅ Connected to MongoDB Atlas');
    } catch (err) {
        console.error('❌ MongoDB Connection Error:', err);
        process.exit(1);
    }
};

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    aadhaar_no: { type: String, required: true },
    age: { type: Number, required: true },
    complaints_filed: { type: Number, default: 0 },
    role: { type: String, default: 'citizen' },
    created_at: { type: Date, default: Date.now }
});

const complaintSchema = new mongoose.Schema({
    user_id: { type: String },
    title: { type: String, required: true },
    description: { type: String },
    address: { type: String },
    lat: { type: Number },
    lng: { type: Number },
    image_base64: { type: String },
    severity: { type: String, default: 'Medium' },
    priority: { type: String, default: '7 Days' },
    status: { type: String, default: 'Pending' },
    created_at: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = { connectDB, User, Complaint };
