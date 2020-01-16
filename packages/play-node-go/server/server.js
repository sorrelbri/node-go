const createError = require('http-errors');
const express = require('express');

const cors = require('cors');

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const db = require('./data/db');

const dotenv = require('dotenv');
dotenv.config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const apiRouter = require('./routes/api');

const app = express();

const allowedOrigin = process.env.NODE_ENV === 'production' ? env.REACT_ADDRESS : '*';
const corsOptions = {
  origin: allowedOrigin
}

app.options('*', cors(corsOptions));
app.use('*', cors(corsOptions));

// disable logging for tests
if (process.env.NODE_ENV !== 'test') app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
// @auth
app.use('/api/v1', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
