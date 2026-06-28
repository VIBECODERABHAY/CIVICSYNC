const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { User, Complaint } = require('../db/init');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "YOUR_API_KEY");

// @route   POST /api/reports/submit
// @desc    Analyze image using Gemini and save to MongoDB
router.post('/submit', async (req, res) => {
  const { user_id, title, description, address, lat, lng, image_base64 } = req.body;
  
  let severity = 'Medium';
  let priority = '7 Days';
  let aiAnalysis = { note: "No image provided for AI analysis" };

  const getUserAge = async (id) => {
    if (!id || id === 1 || id === '1') return null;
    try {
      const user = await User.findById(id);
      return user ? user.age : null;
    } catch (e) { return null; }
  };

  try {
    const userAge = await getUserAge(user_id);
    if (image_base64) {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
      
      let prompt = `You are a city infrastructure AI. Analyze this image for civic issues (potholes, garbage, broken streetlights, water leaks, etc). 
      Respond ONLY in strict JSON format like this:
      {
        "severity": "Low" | "Medium" | "High" | "Critical",
        "priority": "Immediate" | "7 Days" | "30 Days"
      }`;

      if (title === 'Spitting Tambaku') {
          prompt = `You are an AI enforcing public cleanliness. Analyze this image of someone spitting tambaku/tobacco. 
          Check if there is a CLEAR HUMAN FACE visible in the image.
          Respond ONLY in strict JSON format like this:
          {
            "severity": "Low" | "Medium" | "High" | "Critical",
            "priority": "Immediate" | "7 Days" | "30 Days",
            "face_detected": true | false
          }`;
      }

      const imageParts = [{ inlineData: { data: image_base64, mimeType: "image/jpeg" } }];
      const result = await model.generateContent([prompt, ...imageParts]);
      let text = (await result.response).text().replace(/```json/g, '').replace(/```/g, '').trim();
      
      aiAnalysis = JSON.parse(text);
      severity = aiAnalysis.severity || 'Medium';
      priority = aiAnalysis.priority || '7 Days';
    }

    if (userAge !== null) {
      if (userAge >= 60) {
        priority = '2 Days (Senior Citizen)';
      } else if (userAge >= 17 && userAge <= 20) {
        priority = '2 Days (Junior Citizen)';
      }
    }

    let fineIssued = false;
    let fineAmount = 0;

    console.log(`\n[NOTIFICATION SIMULATION]`);
    console.log(`🚨 Alert sent to nearest Nagar Nigam Official!`);
    console.log(`New Issue: ${title} | Severity: ${severity} | Priority: ${priority}`);

    if (title === 'Spitting Tambaku' && aiAnalysis.face_detected) {
        fineIssued = true;
        fineAmount = 50;
        console.log(`👁️‍🗨️ AI FACE MATCH SUCCESSFUL: Found match in simulated Aadhaar DB.`);
        console.log(`💸 Fine of ₹50 auto-issued to offender.`);
    }
    console.log(`\n`);

    // Insert into MongoDB
    const newComplaint = new Complaint({
      user_id: (!user_id || user_id === 1 || user_id === '1') ? null : user_id,
      title, description, address, lat, lng, image_base64, severity, priority, status: 'Pending'
    });
    await newComplaint.save();

    if (user_id && user_id !== 1 && user_id !== '1') {
      await User.findByIdAndUpdate(user_id, { $inc: { complaints_filed: 1 } });
    }

    res.status(201).json({
      message: 'Report submitted and analyzed successfully',
      report_id: newComplaint._id,
      analysis: aiAnalysis,
      fineIssued: fineIssued,
      fineAmount: fineAmount
    });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Failed to process report' });
  }
});

// @route   GET /api/reports
// @desc    Get all active reports for the Map
router.get('/', async (req, res) => {
  try {
    const reports = await Complaint.find({ status: { $ne: 'Resolved' } });
    
    // Map _id to id for frontend compatibility
    const mappedReports = reports.map(r => ({ ...r._doc, id: r._id }));
    res.json(mappedReports);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
});

module.exports = router;
