const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  studentId: {
    type: String,
    required: true,
    unique: true
  },
  enrollmentNumber: {
    type: String,
    unique: true,
    sparse: true
  },
  branch: {
    type: String,
    required: true,
    enum: ['Computer Science', 'Information Technology', 'Electronics', 'Mechanical', 'Civil', 'Electrical']
  },
  year: {
    type: Number,
    required: true,
    min: 1,
    max: 4
  },
  semester: {
    type: Number,
    required: true,
    min: 1,
    max: 8
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other']
  },
  phoneNumber: {
    type: String,
    required: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String,
    country: {
      type: String,
      default: 'India'
    }
  },
  guardianName: {
    type: String,
    required: true
  },
  guardianPhone: {
    type: String,
    required: true
  },
  guardianEmail: String,
  admissionDate: {
    type: Date,
    default: Date.now
  },
  graduationDate: Date,
  cgpa: {
    type: Number,
    min: 0,
    max: 10
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Graduated', 'Suspended'],
    default: 'Active'
  },
  profileImage: String,
  documents: [{
    name: String,
    url: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Index for faster queries
studentSchema.index({ studentId: 1 });
studentSchema.index({ branch: 1, year: 1 });

module.exports = mongoose.model('Student', studentSchema);