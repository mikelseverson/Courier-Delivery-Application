var express = require('express');
var router = express.Router();

//Models
var Product = require('../models/product'),
    Category = require('../models/category');

//Create new product and add to category
router.post("/create", function(req, res) {
    console.log("new Product", req.body);
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
        if(err) {
            res.send("Error product " + req.params.productId + " not found.");
            console.log(err);
        }
        res.send(product);
    })
});

module.exports = router;