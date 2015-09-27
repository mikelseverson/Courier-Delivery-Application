var express = require('express'),
    router = express.Router();

//Models
var Product = require('../models/product'),
    Category = require('../models/category');

//Create category
router.post("/create", function(req, res) {
    if(req.isAuthenticated()) {
        var category = new Category({
            name: req.body.name,
            url: req.body.url
        });
        category.save(function (err) {
            if(err) res.send(err);
            res.send(category);
        });
    }
    else {
        res.status(401).send("You must be authenticated to create a category");
    }
});

//Remove category
router.post("/delete", function(req, res) {
    if(req.isAuthenticated()) {
        Category.findById(req.body.categoryId).remove(function(err) {
            if(err) {
                console.log(err);
                res.send(err);
            }
            else {
                res.send("Product Deleted");
            }
        })
    }
    else {
        res.status(401).send("You must be authenticated to delete a category")
    }
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
    return Category.find({}) //Grabs all categories
        .populate('products') //Builds products inside found categories
        .exec(function(err, categories) {
        if(err) throw new Error(err);
        res.send({storeData : categories, userObject : req.user});
    })
});

module.exports = router;