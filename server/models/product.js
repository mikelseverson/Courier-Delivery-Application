var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Productschema = new Schema({
    category : String,
    name : String,
    img_src : { type: String, default: "https://alicarnold.files.wordpress.com/2009/11/new-product.jpg" },
    desc : String,
    price : Number,
    url_slug : String
});

module.exports = mongoose.model("Product", Productschema);