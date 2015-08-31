var express = require('express');
var Products = require('../models/product');

var router = express.Router();

//Query Products by Category
router.get("/:category/products", function(req, res) {
    Products.find({category : req.params.category}, function(err, products) {
        res.send(products);
    })
});

//Get all unique categories
router.get("/all", function(req, res) {
    Products.collection.distinct('category', function(error, results){
        console.log("request for categories")
        res.send(results);
    });
});

module.exports = router;