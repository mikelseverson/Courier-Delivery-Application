var express = require('express');
var router = express.Router();

//Models
var Product = require('../models/product'),
    Category = require('../models/category');

//Create new product
router.post("/create", function(req, res) {
    if(req.isAuthenticated()) {
        Category.findById(req.body.category, function(err, category) {
            category.products.push(req.body);
            category.save(function (err) {
                if (err) {
                    console.log(err);
                    res.status(400).send(err)
                }
                res.send(category)
            });
        });

    }
    else {
        res.send("You must be authenticated to create a product");
    }
});

//Delete product
router.post("/delete", function(req, res) {
    if(req.isAuthenticated()) {
        if(req.body.productId == undefined) {
            res.status(400).send("ERROR: No product selected")
        }
        else if(req.body.categoryId == undefined) {
            res.status(400).send("ERROR: No category selected")
        }
        else {
            Category.findById(req.body.categoryId, function(err, category) {
                if(category == null) {
                    res.status(400).send("Category not found");
                }
                else {
                    category.products.id(req.body.productId).remove();
                    category.save(function (err) {
                        if (err) {
                            console.log(err);
                            res.status(400).send(err)
                        }
                        res.send("removed");
                    });
                }
            });
        }
    }
    else {
        res.send("ERROR: You are not authenticated!");
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