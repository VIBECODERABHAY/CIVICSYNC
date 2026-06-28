const express = require('express');
const router = express.Router();
const { Complaint } = require('../db/init');

// @route   GET /api/official/dashboard
// @desc    Tech team views all complaints
router.get('/dashboard', async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ created_at: -1 });
    res.json(complaints.map(c => ({ ...c._doc, id: c._id })));
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch complaints' });
  }
});

// @route   POST /api/official/assign
// @desc    Assign a complaint to a worker
router.post('/assign', async (req, res) => {
  const { complaint_id, worker_id, instructions } = req.body;
  try {
      await Complaint.findByIdAndUpdate(complaint_id, { status: 'Assigned' });
      res.json({ message: 'Worker assigned successfully', assignment_id: Math.floor(Math.random() * 1000) });
  } catch (err) {
      res.status(500).json({ error: 'Failed to assign worker' });
  }
});

// @route   POST /api/official/resolve
// @desc    Worker resolves the issue with a photo
router.post('/resolve', async (req, res) => {
  const { complaint_id, fixed_image_base64 } = req.body;
  try {
      await Complaint.findByIdAndUpdate(complaint_id, { status: 'Resolved' });
      
      console.log(`\n[NOTIFICATION SIMULATION]`);
      console.log(`✅ Push Notification sent to Civilian!`);
      console.log(`Your complaint #${complaint_id} has been resolved by Nagar Nigam workers.\n`);
      
      res.json({ message: 'Issue resolved and civilian notified.' });
  } catch (err) {
      res.status(500).json({ error: 'Failed to update civilian DB' });
  }
});

module.exports = router;
