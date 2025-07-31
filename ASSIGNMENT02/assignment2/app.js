const connectDB = require('./config/db');
connectDB(); // call the function to connect to MongoDB

const session = require('express-session');
const passport = require('passport');
require('./config/passport')(passport);  // Load strategy early!

const authRouter = require('./routes/auth');
const indexRouter = require('./routes/index');
const recordsRouter = require('./routes/records');
const usersRouter = require('./routes/users');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//  Set up session and passport BEFORE routes
app.use(session({
  secret: 'mysecretkey',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//  Now register routes
app.use('/', indexRouter);
app.use('/records', recordsRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

// 404 & Error handlers
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
