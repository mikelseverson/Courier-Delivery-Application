var express = require('express');
var Product = require('../models/product');
var Category = require('../models/category');

var router = express.Router();

//Create Category
router.post("/create", function(req, res) {
    console.log(req.body);
    var category = new Category({
        name: req.body.name,
        url: req.body.url,
        products: []
    });
    category.save(function (err) {
        console.log(err);
    });
    res.json(category);
});

//Query Products by Category
router.get("/:category/products", function(req, res) {
    Product.find({category : req.params.category}, function(err, products) {
        res.send(products);
    })
});

//Get all Categories
router.get("/all", function(req, res) {
    return Category.find({}).exec(function(err, categories) {
        if(err) throw new Error(err);
        res.json(categories);
    })
});

module.exports = router;