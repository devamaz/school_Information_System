const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');


//import modules
const routes = require('./routes/index');



// init Express app
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'pug'); 

// serves up static files from the public folder. 
app.use(express.static(path.join(__dirname, 'publics')));

//route logger
app.use(logger('dev'));
// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Express Session Middleware
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

// Express Validator Middleware
app.use(validator());

// handle our own routes!
app.use('/', routes);

//missing page middleware
app.use((req, res, next) => {
  const err = new Error(' Page Not Found');
  err.status = 404;
  next(err);
});

//erroe on dev
if (app.get('env') === 'development') {
app.use((err, req, res, next) => {
  err.stack = err.stack || '';
  const errorDetails = {
    message: err.message,
    status: err.status,
    stackHighlighted: err.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>')
  };
  // render the error page
  res.status(err.status || 500);
  res.render('error', errorDetails);
});
}

//error on production
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;