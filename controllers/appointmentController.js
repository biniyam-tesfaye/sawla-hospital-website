const Appointment = require('../models/appointment');

// Handle appointment booking
exports.bookAppointment = (req, res) => {
  const { name, phone, email, date, department, doctor, message } = req.body;

  if (!name || !phone || !date || !department) {
    return res.status(400).json({ success: false, message: 'Please fill in all required fields.' });
  }

  Appointment.save({
    name,
    phone,
    email,
    date,
    department,
    doctor,
    message,
    createdAt: new Date().toISOString()
  });

  return res.json({
    success: true,
    message: 'Your appointment request has been received. Our team will confirm with you shortly.'
  });
};



