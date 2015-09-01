var express = require('express');
var Product = require('../models/product');
var Category = require('../models/category');

var router = express.Router();

//Create new product and add to category
router.post("/create", function(req, res) {
    console.log(req.body);
    var product = new Product(req.body);
    Category.findByIdAndUpdate(req.body.category, { $push: { "products" : product}},
        { safe: true, upsert: true}, function() {
        product.save(function (err, Category) {
            if(err) console.log(err.message);
            res.json(Category);
        })
    });
});

//Query individual Product information
router.get("/:productId", function(req, res) {
    Product.find({_id : req.params.productId}, function(err, product) {
        res.send(product);
    })
});

module.exports = router;