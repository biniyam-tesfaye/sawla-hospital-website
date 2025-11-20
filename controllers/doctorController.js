const Doctor = require('../models/doctor');

// Return doctors list as JSON
exports.getDoctors = (req, res) => {
  const doctors = Doctor.findAll();
  res.json({ success: true, data: doctors });
};



