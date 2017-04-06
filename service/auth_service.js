"use strict";
const jwt = require('jsonwebtoken');
const configJWT = require('../config');
var messages = require('../messages.json');

exports.createToken = function (user) {
    return jwt.sign({user_id: user._id, email: user.email}, configJWT.jwt.secret, {
        expiresIn: configJWT.jwt.expiresIn
    });
};

exports.ensureAuthenticated = function (req, res, next) {
    const token = req.body.token || req.query.token || req.get('x-access-token');
    const language = req.header('Accept-Language');

    if (!token) {
        var message = messages.TOKEN_INVALID;
        if (language == 'es') {
            message = message.es;
        } else if (language == 'en') {
            message = message.en;
        }
        return res.status(401).json({success: false, error: message});
    }

    jwt.verify(token, configJWT.jwt.secret, function (err, decoded) {
        if (err) {
            return next(new Error('Invalid token'));
        }
        req.user_id = decoded.user_id;
        next();
    });
};