var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OrderSchema = new Schema({
    quoteObject : Object,
    deliveryObject : Object,
    manifest : {type: String, default: "A box of Kittens"},
    pickup_address : String,
    dropoff_address : String,
    dropoff_name : String,
    dropoff_phone_number: String,
    dropoff_notes : String
});

module.exports = mongoose.model("Order", OrderSchema);