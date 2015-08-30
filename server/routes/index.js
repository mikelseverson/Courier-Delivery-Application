var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');
var Users = require('../models/user');
var Products = require('../models/product');

//Create new product
router.post("/create-product", function(req, res) {
    console.log(req.body);
    Products.create(req.body);
});

//Query individual Product information
router.get("/product/:productId", function(req, res) {
    Products.find({_id : req.params.productId}, function(err, product) {
        res.send(product);
    })
});

//Query Products by Category
router.get("/:category/products", function(req, res) {
    Products.find({category : req.params.category}, function(err, products) {
        res.send(products);
    })
});

//Get all unique categories
router.get("/get-categories", function(req, res) {
    Products.collection.distinct('category', function(error, results){
        console.log("request for categories")
        res.send(results);
    });
});

//Vendor Log in
router.post('/login', passport.authenticate('local', {
        successRedirect: '/#/vendor',
        failureRedirect: '/'
    })
);

//Vendor Register
router.post('/register', function(req,res,next) {
    console.log(req.body);
    Users.create(req.body, function (err, post) {
        if (err) next(err);
        else res.redirect('/users');
    })
});

//Catch-all
router.get("/*", function(req, res, next){
    var file = req.params[0] || "assets/views/index.html";
    res.sendFile(path.join(__dirname, "../public", file));
});

module.exports = router;