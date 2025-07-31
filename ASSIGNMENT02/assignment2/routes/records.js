const express = require('express');
const router = express.Router();
const HealthRecord = require('../models/HealthRecord');

//  Public route - Show all records
router.get('/', async (req, res) => {
  try {
    const records = await HealthRecord.find().sort({ date: -1 });
    res.render('records/index', { records });
  } catch (err) {
    res.status(500).send('Error retrieving health records');
  }
});

module.exports = router;
