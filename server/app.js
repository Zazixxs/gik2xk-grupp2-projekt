var createError = require('http-errors');
var express = require('express');
var path = require('path');
var app = express();
var morgan = require('morgan');

app.use(morgan('dev'));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/', require('./routes/Products'));
app.use('/api/products', require('./routes/Products'));
app.use('/api/product', require('./routes/Products'));
app.use('/api/rating', require('./routes/Products'));

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // send the error as JSON
  res.status(err.status || 500);
  res.json({ error: 'Serverfel' });
});

module.exports = app;
