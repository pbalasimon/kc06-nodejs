'use strict';

var mongoose = require('mongoose');
require('../service/db_service');
require('../models/user');
require('../models/ad');
var Ad = mongoose.model('Ad');
var User = mongoose.model('User');

var data = require('../data.json');

function deleteUsers() {
    console.log('Eliminando usuarios');
    return new Promise(function (resolve, reject) {
        User.remove({}, function (err) {
            if (err) reject(err);
            resolve();
        });
    });
}

function deleteAds() {
    console.log('Eliminando anuncios');
    return new Promise(function (resolve, reject) {
        Ad.remove({}, function (err) {
            if (err) reject(err);
            resolve();
        });
    });
}

function createUsers() {
    console.log('Crear usuarios por defecto');
    return new Promise(function (resolve, reject) {
        User.insertMany(data.users, function (err) {
            if (err) reject(err);
            resolve();
        });
    });
}

function createAds() {
    console.log('Creando anuncios de prueba');
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
            console.log('Datos guardados correctamente');
            process.exit();
        })
        .catch(function (err) {
            console.log('Error al crear los datos por defecto');
            console.log(err);
            process.exit();
        });
});