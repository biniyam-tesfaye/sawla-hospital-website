const express = require('express');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');

const pageRoutes = require('./routes/pages');
const apiRoutes = require('./routes/api');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 3000;

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'sawla_session_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 // 1 hour
    }
  })
);

app.use((req, res, next) => {
  res.locals.isAdmin = req.session?.isAdmin;
  res.locals.adminUser = req.session?.adminUser;
  next();
});

// Routes
app.use('/', pageRoutes);
app.use('/api', apiRoutes);
app.use('/admin', adminRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', {
    title: 'Page Not Found | Sawla General Hospital'
  });
});
// health check
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Sawla General Hospital website running on port ${PORT}`);
});



