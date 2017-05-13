"use strict";

var mongoose = require('mongoose');
var Ad = mongoose.model('Ad');

exports.findAllAds = function (req, res) {

    const tag = req.query.tag;
    const name = req.query.name;
    const sale = req.query.sale;
    const price = req.query.price;
    const sort = req.query.sort;
    const limit = parseInt(req.query.limit);
    const filter = {};

    if (tag) {
        filter.tags = {
            $in: [tag]
        }
    }
    if (sale) {
        filter.sale = sale;
    }
    if (price) {
        if (price.startsWith('-')) {
            var topPrice = parseInt(price.substr(1, price.length));
            filter.price = {
                '$lte': topPrice
            }
        } else if (price.endsWith('-')) {
            var bottomPrice = parseInt(price.substr(0, price.length - 1));
            filter.price = {
                '$gte': bottomPrice
            }
        } else {
            var prices = price.split('-');

            if (prices.length == 2) {
                var bottomPrice = parseInt(prices[0]);
                var topPrice = parseInt(prices[1]);
                filter.price = {
                    '$gte': bottomPrice, '$lte': topPrice
                }
            } else if (prices.length == 1) {
                filter.price = price;
            }
        }

    }

    if (name) {
        filter.name = new RegExp('^' + name, "i");
    }

    Ad.list(filter, limit, sort, function (err, ads) {
        if (err) return res.status(500).send(err.message);
        res.status(200).json(ads);
    });
}

exports.findAllTags = function (req, res) {
    Ad.find().distinct('tags', function (err, ads) {
        if (err) return res.status(500).send(err.message);
        res.status(200).send(ads);
    });
};