const express = require('express');
const { protect, authorize } = require('./middleware/auth');

const router = express.Router();

// Placeholder routes for notice board
router.get('/', protect, (req, res) => {
  res.json({ message: 'Notices routes - To be implemented' });
});

router.post('/', protect, authorize('faculty', 'admin'), (req, res) => {
  res.json({ message: 'Create notice - To be implemented' });
});

module.exports = router;