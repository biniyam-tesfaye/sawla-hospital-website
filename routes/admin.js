const express = require('express');
const adminController = require('../controllers/adminController');
const { requireAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/login', adminController.showLogin);
router.post('/login', adminController.handleLogin);
router.post('/logout', requireAdmin, adminController.logout);
router.get('/appointments', requireAdmin, adminController.viewAppointments);

module.exports = router;



