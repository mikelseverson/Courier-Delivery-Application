var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CategorySchema = new Schema({
   name: { type: String, required: true, index: { unique: true } },
   url: { type: String, required: true, index: { unique: true } },
   products: []
});

module.exports = mongoose.model('Category', CategorySchema);