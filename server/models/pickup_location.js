var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var PickupLocationSchema = new Schema({
    name : String,
    address : String,
    phone_number : String
});

module.exports = mongoose.model("PickupLocation", PickupLocationSchema);