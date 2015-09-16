var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var Product = require('./product');

var CategorySchema = new Schema({
   name: { type: String, required: true, index: { unique: true } },
   url: { type: String, required: true, index: { unique: true } },
   products: [{ type: Schema.ObjectId, ref: 'Product' }]
});

module.exports = mongoose.model('Category', CategorySchema);