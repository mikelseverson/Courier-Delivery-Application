var express = require('express');
var router = express.Router();

//Models
var Product = require('../models/product'),
    Category = require('../models/category');

//Create new product and add to category
router.post("/create", function(req, res) {
    var product = new Product(req.body);
    product.save(function (err) {
        if(err) console.log(err.message);
        else {
            Category.findByIdAndUpdate(req.body.category, { $push: { "products" : product}},
                { safe: true, upsert: true}, function(err, cat){
                    console.log(err);
                    console.log(cat);
                });
        }
    });
});

//Query individual Product information
router.get("/:productId", function(req, res) {
    Product.find({_id : req.params.productId}, function(err, product) {
        if(err) {
            res.send(err);
            console.log(err);
        }
        res.send(product);
    })
});

module.exports = router;