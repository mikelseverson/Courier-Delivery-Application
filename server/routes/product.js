var express = require('express');
var router = express.Router();

//Models
var Product = require('../models/product'),
    Category = require('../models/category');

//Create new product and add to category

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