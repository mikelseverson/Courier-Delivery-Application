var express = require('express');
var router = express.Router();
var path = require('path');
var Postmates = require('postmates');
var postmates = new Postmates('cus_KKTBUzym9jC16k', '6854a484-6226-43b8-ab7f-0890841bee0a');


//Receive Postmates Quote Price
router.post("/query", function(request, response) {
    postmates.quote(request.body, function(err, res) {
        if(res.body !== undefined) response.send(res.body);

    });
});

//Submit Quote to Postmates for delivery
router.post("/create", function(req, res) {
    postmates.new({
        manifest: "a box of kittens",

        pickup_name: "The Warehouse",
        pickup_address: req.body.pickup_address,
        pickup_phone_number: "555-555-5555",
        pickup_business_name: "Optional Pickup Business Name, Inc.",
        pickup_notes: "Optional note that this is Invoice #123",

        dropoff_name: "Alice",
        dropoff_address: req.body.dropoff_address,
        dropoff_phone_number: "415-555-1234",
        dropoff_business_name: "Optional Dropoff Business Name, Inc.",
        dropoff_notes: "Optional note to ring the bell",

        quote_id: req.body.quote
    }, function(err, response) {
        if(err) console.log(err);
        res.send(response);
    });
});

//Grab a list of all active deliveries
router.get("/deliveries", function(req, res) {
    postmates.list('ongoing', function(err, response) {
        if(response.body == undefined) {
            res.send("error");
        }
        res.send(response.body);
    });
});

module.exports = router;
