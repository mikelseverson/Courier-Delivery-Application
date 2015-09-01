var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Productschema = new Schema({
    category : String,
    name : String,
    img_src : String,
    desc : String,
    price : Number,
    url_slug : String
});

Productschema.pre('save', function (next) {
   console.log("presave init");
    next();
});

module.exports = mongoose.model("Product", Productschema);