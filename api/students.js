const express = require('express');
const { protect, authorize } = require('./middleware/auth');
const Student = require('./models/Student');

const router = express.Router();

// @route   GET /api/students
// @desc    Get all students
// @access  Private (Admin, Faculty)
router.get('/', protect, authorize('admin', 'faculty'), async (req, res) => {
  try {
    const students = await Student.find().populate('user', 'name email');
    res.json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/students/:id
// @desc    Get single student
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('user');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/students
// @desc    Create student
// @access  Private (Admin)
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/students/:id
// @desc    Update student
// @access  Private (Admin)
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/students/:id
// @desc    Delete student
// @access  Private (Admin)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;