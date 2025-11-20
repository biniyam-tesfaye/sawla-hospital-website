const adminUsers = require('../config/adminUsers');
const Appointment = require('../models/appointment');

exports.showLogin = (req, res) => {
  if (req.session?.isAdmin) {
    return res.redirect('/admin/appointments');
  }
  return res.render('admin-login', {
    title: 'Admin Login | Sawla General Hospital',
    error: null
  });
};

exports.handleLogin = (req, res) => {
  const { username, password } = req.body;
  const match = adminUsers.find(
    (user) => user.username === username && user.password === password
  );

  if (!match) {
    return res.status(401).render('admin-login', {
      title: 'Admin Login | Sawla General Hospital',
      error: 'Invalid username or password.'
    });
  }

  req.session.isAdmin = true;
  req.session.adminUser = username;
  return res.redirect('/admin/appointments');
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/admin/login');
  });
};

exports.viewAppointments = (req, res) => {
  const appointments = Appointment.findAll();
  res.render('admin-appointments', {
    title: 'Appointment Dashboard | Sawla General Hospital',
    appointments,
    adminUser: req.session?.adminUser || 'Admin'
  });
};


