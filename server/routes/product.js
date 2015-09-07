var express = require('express');
var router = express.Router();

//Models
var Product = require('../models/product'),
    Category = require('../models/category');

//Create new product
router.post("/create", function(req, res) {
    Category.findById(req.body.category, function(err, category) {
        category.products.push(req.body);
        category.save(function (err) {
            if (err) {
                console.log(err);
                res.send(err)
            }
            console.log('Success!');
            res.send(category)
        });
    });
});

//Delete product
router.post("/delete", function(req, res) {
    Category.findById(req.body.categoryId, function(err, category) {
        var doc = category.products.id(req.body.productId).remove();
        console.log(doc);
        category.save(function (err) {
            if (err) {
                console.log(err);
                res.send(err)
            }
            console.log('the sub-doc was removed');
            res.send("removed", doc);
        });
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