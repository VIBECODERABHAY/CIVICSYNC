const express = require('express');
const router = express.Router();
const { User } = require('../db/init');

// @route   POST /api/auth/civilian/register
// @desc    Register a new civilian user
router.post('/civilian/register', async (req, res) => {
  const { name, email, password, aadhaar_no } = req.body;
  
  // Basic Age extraction mock (using last 2 digits of Aadhaar)
  const age = parseInt(aadhaar_no.slice(-2)) || 25;

  try {
    const newUser = new User({ name, email, password, aadhaar_no, age });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: { ...newUser._doc, id: newUser._id } });
  } catch (error) {
    res.status(500).json({ error: 'Email or Aadhaar already exists in database' });
  }
});

// @route   POST /api/auth/civilian/login
// @desc    Login for civilian user
router.post('/civilian/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    res.json({ message: 'Login successful', user: { ...user._doc, id: user._id } });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// @route   POST /api/auth/official/register
// @desc    Register a new official user
router.post('/official/register', async (req, res) => {
  const { name, email, password, agency_id } = req.body;
  
  if (!email.endsWith('@nagarnigam.in')) {
      return res.status(403).json({ error: 'Must use an official @nagarnigam.in email domain' });
  }

  try {
    const newUser = new User({ 
        name, 
        email, 
        password, 
        aadhaar_no: agency_id, // Store agency_id in aadhaar_no field to reuse schema
        age: 30, // Mock age
        role: 'official' 
    });
    await newUser.save();
    res.status(201).json({ message: 'Official registered successfully', user: { ...newUser._doc, id: newUser._id } });
  } catch (error) {
    res.status(500).json({ error: 'Email or Agency ID already exists' });
  }
});

// @route   POST /api/auth/official/login
// @desc    Login for official user
router.post('/official/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email, password, role: 'official' });
    if (!user) return res.status(401).json({ error: 'Invalid official credentials' });
    res.json({ message: 'Official Login successful', user: { ...user._doc, id: user._id } });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
