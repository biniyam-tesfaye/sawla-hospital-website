const Contact = require('../models/contact');

// Handle contact form submission
exports.submitContact = (req, res) => {
  const { name, phone, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Please fill in all required fields.' });
  }

  Contact.save({ name, phone, email, message, createdAt: new Date().toISOString() });

  return res.json({ success: true, message: 'Thank you for contacting Sawla General Hospital. We will get back to you shortly.' });
};



