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

//  Show the form to add a new health record
router.get('/add', (req, res) => {
  res.render('records/add');
});

//  Handle form submission and save new record
router.post('/add', async (req, res) => {
  try {
    const newRecord = new HealthRecord({
      date: req.body.date,
      bloodPressure: req.body.bloodPressure,
      sugarLevel: req.body.sugarLevel,
      temperature: req.body.temperature,
      heartRate: req.body.heartRate,
      symptoms: req.body.symptoms,
      userId: null 
    });

    await newRecord.save();
    res.redirect('/records');
  } catch (err) {
    res.status(500).send('Error saving record');
  }
});

//  Show the edit form with existing data
router.get('/edit/:id', async (req, res) => {
  try {
    const record = await HealthRecord.findById(req.params.id);
    res.render('records/edit', { record });
  } catch (err) {
    res.status(500).send('Error loading edit form');
  }
});

//  Handle form update
router.post('/edit/:id', async (req, res) => {
  try {
    await HealthRecord.findByIdAndUpdate(req.params.id, {
      date: req.body.date,
      bloodPressure: req.body.bloodPressure,
      sugarLevel: req.body.sugarLevel,
      temperature: req.body.temperature,
      heartRate: req.body.heartRate,
      symptoms: req.body.symptoms
    });
    res.redirect('/records');
  } catch (err) {
    res.status(500).send('Error updating record');
  }
});

//  Show delete confirmation
router.get('/delete/:id', async (req, res) => {
  try {
    const record = await HealthRecord.findById(req.params.id);
    res.render('records/delete', { record });
  } catch (err) {
    res.status(500).send('Error loading delete page');
  }
});

//  Handle actual delete
router.post('/delete/:id', async (req, res) => {
  try {
    await HealthRecord.findByIdAndDelete(req.params.id);
    res.redirect('/records');
  } catch (err) {
    res.status(500).send('Error deleting record');
  }
});







module.exports = router;
