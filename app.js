var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var uccFormRouter = require('./routes/ucc-form');
var spbVaultRouter = require('./routes/spb-ucc-vault');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/ucc-form', uccFormRouter);
app.use('/spb-ucc-vault', spbVaultRouter);
app.use('/users', usersRouter);

var ucc = require('./routes/ucc');
app.use('/ucc-api', ucc);

var data_client = require('./routes/data-client');
app.use('/data-client', data_client);

var order_capture = require('./routes/order-capture');
app.use('/order-capture', order_capture);

const welcomeText = () => {
  console.log("PayPal Advance Credit Card Project is started. \n\nPlease go to \"http://localhost:3000/ucc-form\"...")
}

welcomeText()

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
  res.render('error');
});

module.exports = app;
