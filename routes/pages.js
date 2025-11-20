const express = require('express');
const router = express.Router();
const News = require('../models/news');

// Render static pages
router.get('/', (req, res) => {
  res.render('home', { title: 'Sawla General Hospital' });
});

router.get('/about', (req, res) => {
  const news = News.findAll();
  res.render('about', { title: 'About Us | Sawla General Hospital', news });
});

router.get('/services', (req, res) => {
  res.render('services', { title: 'Services | Sawla General Hospital' });
});

router.get('/departments', (req, res) => {
  res.render('departments', { title: 'Departments | Sawla General Hospital' });
});

router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact Us | Sawla General Hospital' });
});

module.exports = router;


