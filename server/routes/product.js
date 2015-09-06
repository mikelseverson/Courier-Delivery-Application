var express = require('express'),
    router = express.Router();

//Models
var Product = require('../models/product'),
    Category = require('../models/category');

//Add a product to category
router.post("/create", function(req, res) {
    var product = new Product(req.body);
    Category.findByIdAndUpdate(req.body.categoryId, { $push: { "products" : product}},
        { safe: true, upsert: true}, function(err, category){
            if(err) {
                console.log("error creating product", err);
                res.send(err);
            }
            else {
                res.send("Product successfully added.")
            }
        });
});

//Delete a product inside a category
router.post("/delete", function(req, res) {
    console.log(req.body);
    Category.update({ _id : req.body.categoryId },
        { products : { $pull : { $elemMatch : { _id : req.body.productId }}}}, function(err, category) {
        if(err) {
            console.log(err);
            res.send(err);
        }
         else {
            console.log(category);
            res.send("done");
        }
    })
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