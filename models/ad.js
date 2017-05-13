"use strict";

var mongoose = require('mongoose');
var adSchema = mongoose.Schema({
    name: String,
    sale: Boolean,
    price: Number,
    photo: String,
    tags: [String]
});

adSchema.statics.list = function (filter, limit, sort, cb) {
    const query = Ad.find(filter);
    query.limit(limit);
    query.sort(sort);
    query.exec(cb);
};

var Ad = mongoose.model('Ad', adSchema);
module.exports = Ad;