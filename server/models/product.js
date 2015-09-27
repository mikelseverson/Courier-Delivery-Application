var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var Category = require('./product');

var Productschema = new Schema({
    _category : { type: Schema.ObjectId, ref: 'Category' },
    name : String,
    img_src : { type: String, default: "assets/images/stock-image.png" },
    desc : String,
    price : Number,
    url_slug : String
});

module.exports = mongoose.model("Product", Productschema);