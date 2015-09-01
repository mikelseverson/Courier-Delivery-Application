var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CategorySchema = new Schema({
   name: String,
   url: String,
   products: [],
});

module.exports = mongoose.model('Category', CategorySchema);