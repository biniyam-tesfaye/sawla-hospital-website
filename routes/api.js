const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contactController');
const appointmentController = require('../controllers/appointmentController');
const doctorController = require('../controllers/doctorController');

// Contact form endpoint
router.post('/contact', contactController.submitContact);

// Appointment booking endpoint
router.post('/appointments', appointmentController.bookAppointment);

// Doctors data endpoint
router.get('/doctors', doctorController.getDoctors);

module.exports = router;



