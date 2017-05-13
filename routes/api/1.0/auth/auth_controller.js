"use strict";

const mongoose = require('mongoose');
const User = mongoose.model('User');
const authService = require('../../../../service/auth_service');
const sha = require('sha256');
var messages = require('../../../../messages.json');

exports.signup = function (req, res) {

    const name = req.body.name;
    const email = req.body.email;
    var password = req.body.password;
    var language = req.header('Accept-Language');
    console.log(language);

    if (!name) {
        var message = messages.NAME_MANDATORY;
        if (language == 'en') {
            message = message.en;
        } else {
            message = message.es;
        }
        return res.status(401).json({success: false, error: message});
    }

    if (!email) {
        var message = messages.EMAIL_MANDATORY;
        if (language == 'en') {
            message = message.en;
        } else {
            message = message.es;
        }
        return res.status(401).json({success: false, error: message});
    }

    if (!password) {
        var message = messages.PASSWORD_MANDATORY;
        if (language == 'en') {
            message = message.en;
        } else {
            message = message.es;
        }
        return res.status(401).json({success: false, error: message});
    } else {
        password = sha(password)
    }

    var user = new User({
        name: name,
        email: email,
        password: password
    });

    user.save(function (err, user) {
        if (err) return res.status(500).send(err.message);
        res.status(200).json({success: true, user});
    });
};

exports.login = function (req, res) {
    const email = req.body.email;
    var password = req.body.password;
    var language = req.header('Accept-Language');
    console.log(language);

    if (!email) {
        var message = messages.EMAIL_MANDATORY;
        if (language == 'en') {
            message = message.en;
        } else {
            message = message.es;
        }
        return res.status(401).json({success: false, error: message});
    }

    if (!password) {
        var message = messages.PASSWORD_MANDATORY;
        if (language == 'en') {
            message = message.en;
        } else {
            message = message.es;
        }
        return res.status(401).json({success: false, error: message});
    } else {
        password = sha(password);
    }

    User.findOne({email: email.toLowerCase(), password: password}, function (err, user) {

        if (err) return res.status(500).send(err.message);
        if (!user) {
            var message = messages.AUTHENTICATION_FAILED;
            if (language == 'en') {
                message = message.en;
            } else {
                message = message.es;
            }
            return res.status(400).send({success: false, error: message});
        }

        return res
            .status(200)
            .send({success: true, token: authService.createToken(user)});
    });
};