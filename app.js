var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var adModel = require('./models/ad');
var userModel = require('./models/user');
var adsCtrl = require('./routes/api/1.0/ads/ads_controller');
var authCtrl = require('./routes/api/1.0/auth/auth_controller');
require('./service/db_service');
var authService = require('./service/auth_service');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// API routes
var ads = express.Router();
var users = express.Router();

ads.route('/ads').get(authService.ensureAuthenticated, adsCtrl.findAllAds);
ads.route('/tags').get(adsCtrl.findAllTags);
users.route('/auth/signup').post(authCtrl.signup);
users.route('/auth/login').post(authCtrl.login);

app.use('/api/1.0', ads);
app.use('/api/1.0', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
