var express = require('express');
var router = express.Router();

//Models
var Product = require('../models/product'),
    Category = require('../models/category');

//Create category
router.post("/create", function(req, res) {
    console.log(req.body);

    var category = new Category({
        name: req.body.name,
        url: req.body.url,
        products: []
    });

    category.save(function (err) {
        if(err) {
            console.log(err);
            res.send(err);
        }
        res.json(category);
    });
});

//Remove category
router.post("/delete", function(req, res) {
    console.log(req.body);
    Category.find({_id : req.body.categoryId}, function(err, result) {
    }).remove().exec();
    res.send("attemped to remove " + req.body.id);
});


//Query Products by Category
router.get("/:category/products", function(req, res) {
    Product.find({category : req.params.category}, function(err, products) {
        if(err) {
            console.log(err);
            res.send("Error finding products in category " + req.params.category);
        }
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