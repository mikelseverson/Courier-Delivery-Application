/**
 * Created by mikelseverson on 9/6/15.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var storeSchema = new Schema({
    business_name: String,
    pickup_locations: []
});

module.exports = mongoose.model("Store", storeSchema);