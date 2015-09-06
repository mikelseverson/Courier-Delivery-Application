/**
 * Created by mikelseverson on 9/6/15.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OrderSchema = new Schema({
    quote_id : String,
    manifest : String,
    timestamp : Date.now()
});

module.exports = mongoose.model('Order', OrderSchema);