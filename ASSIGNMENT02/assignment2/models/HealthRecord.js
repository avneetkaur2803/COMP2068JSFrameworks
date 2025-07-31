const mongoose = require('mongoose');

const healthRecordSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  bloodPressure: String,
  sugarLevel: String,
  temperature: Number,
  heartRate: Number,
  symptoms: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('HealthRecord', healthRecordSchema);
