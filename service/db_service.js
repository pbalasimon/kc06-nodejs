"use strict";

const mongoose = require('mongoose');
const conn = mongoose.connection;

mongoose.Promise = global.Promise;

conn.on('error', function (err) {
    console.log('Se ha producido un error al realizar la conexión:', err);
    process.exit(1);
});

conn.once('open', function () {
    console.log('Conexión realizada correctamente.');
});

mongoose.connect('mongodb://localhost:27017/nodepop');