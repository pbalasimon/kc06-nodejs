"use strict";

var mongoose = require('mongoose');
var adSchema = mongoose.Schema({
    name: String,
    sale: Boolean,
    price: Number,
    photo: String,
    tags: [String]
});

module.exports = mongoose.model('Ad', adSchema);