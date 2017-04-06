'use strict';

var mongoose = require('mongoose');

require('../service/db_service');
require('../models/user');
require('../models/ad');
var Ad = mongoose.model('Ad');
var User = mongoose.model('User');

var data = require('../data.json');

function deleteUsers() {
    console.log('Vamos a eliminar todos los usuarios...');
    return new Promise(function (resolve, reject) {
        User.remove({}, function (err) {
            if (err) reject(err);
            resolve();
        });
    });
}

function deleteAds() {
    console.log('Vamos a eliminar todos los anuncios...');
    return new Promise(function (resolve, reject) {
        Ad.remove({}, function (err) {
            if (err) reject(err);
            resolve();
        });
    });
}

function createUsers() {
    console.log('Creando Usuarios precargados...');
    return new Promise(function (resolve, reject) {
        User.insertMany(data.users, function (err) {
            if (err) reject(err);
            resolve();
        });
    });
}

function createAds() {
    console.log('Creando Anuncios precargados...');
    return new Promise(function (resolve, reject) {
        Ad.insertMany(data.ads, function (err) {
            if (err) reject(err);
            resolve();
        });
    });
}

mongoose.connection.once('open', function () {
    deleteUsers()
        .then(deleteAds)
        .then(createUsers)
        .then(createAds)
        .then(function () {
            console.log('¡¡Todos los datos creados!!');
            process.exit();
        })
        .catch(function (err) {
            console.log('Algo no ha ido bien... :(');
            console.log(err);
            process.exit();
        });
});