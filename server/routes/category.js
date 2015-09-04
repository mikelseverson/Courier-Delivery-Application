var express = require('express'),
    router = express.Router();

//Models
var Product = require('../models/product'),
    Category = require('../models/category');

//Create category
router.post("/create", function(req, res) {

    var category = new Category({
        name: req.body.name,
        url: req.body.url,
        products: []
    });

    category.save(function (err) {
        if(err) res.send(err);
        res.json(category);
    });
});

//Remove category
router.post("/delete", function(req, res) {
    Category.find({_id : req.body.categoryId}, function(err, result) {
        if(err) throw new Error(err);
        res.send("removing", result);
    }).remove().exec();
});

//Query Products by Category
router.get("/:category/products", function(req, res) {
    Product.find({category : req.params.category}, function(err, products) {
        if(err) throw new Error(err);
        res.send(products);
    })
});

//Get all categories and products
router.get("/all", function(req, res) {
    return Category.find({}).exec(function(err, categories) {
        if(err) throw new Error(err);
        res.json(categories);
    })
});

module.exports = router;