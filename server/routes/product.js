var express = require('express');
var Products = require('../models/product');
var router = express.Router();

//Create new product
router.post("/create", function(req, res) {
    console.log(req.body);
    Products.create(req.body);
});

//Query individual Product information
router.get("/:productId", function(req, res) {
    Products.find({_id : req.params.productId}, function(err, product) {
        res.send(product);
    })
});

module.exports = router;