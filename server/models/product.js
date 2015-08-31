/**
 * Created by mikelseverson on 8/25/15.
 */
var mongoose = require('mongoose');

var Productschema = new mongoose.Schema({
    category : String,
    name : String,
    img_src : String,
    desc : String,
    price : Number
});

module.exports = mongoose.model("Product", Productschema);