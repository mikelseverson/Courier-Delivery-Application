var express = require('express');
var router = express.Router();

//Models
var Product = require('../models/product'),
    Category = require('../models/category');

//Create new product
router.post("/create", function(req, res) {
    if(req.isAuthenticated()) {
        Category.findById(req.body.category, function(err, category) {
            var newProduct = new Product({
                _category: category._id,
                desc: req.body.desc,
                price: req.body.price,
                name: req.body.name,
                url_slug: req.body.url_slug
            });
            newProduct.save(function (err) {
                if (err) console.log(err);
                else {
                    category.products.push(newProduct);
                    category.save();
                    res.send(newProduct);
                }
            });
        });
    }
    else {
        res.status(401).send("You must be authenticated to create a product");
    }
});

//Delete product
router.post("/delete", function(req, res) {
    if(req.isAuthenticated()) {
        if(req.body.productId == undefined) {
            res.status(400).send("ERROR: No product in post request")
        }
        else if(req.body.categoryId == undefined) {
            res.status(400).send("ERROR: No category in post request")
        }
        Product.findById(req.body.productId).remove(function(err) {
            if(err) console.log(err);
            else res.send("deleted");
        });
    }
    else {
        res.status(401).send("ERROR: You are not authenticated!");
    }
});


//Query individual Product information
router.get("/:productId", function(req, res) {
    Product.findById(req.params.productId, function(err, product) {
        if(err) {
            console.log(err);
            res.send(err);
        }
        res.send(product);
    })
});

module.exports = router;