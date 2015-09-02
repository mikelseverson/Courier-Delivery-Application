var express = require('express');
var path = require('path');
var Postmates = require('postmates');
var postmates = new Postmates('cus_KKTBUzym9jC16k', '6854a484-6226-43b8-ab7f-0890841bee0a');
var router = express.Router();

//Receive Postmates quote price
router.post("/query", function(request, response) {
    postmates.quote({ dropoff_address: request.body.dropoff_address, pickup_address: "310 Hennepin Ave E, Minneapolis, MN 55414"}, function(err, res) {
        response.send(res.body);
    });
});

//Post quote to Postmates
router.post("/create", function(req, res) {
    postmates.new({
        manifest: "a box of kittens",

        pickup_name: "The Warehouse",
        pickup_address: "310 Hennepin Ave E, Minneapolis, MN 55414",
        pickup_phone_number: "555-555-5555",
        pickup_business_name: "Optional Pickup Business Name, Inc.",
        pickup_notes: "Optional note that this is Invoice #123",

        dropoff_name: req.body.dropoff_name,
        dropoff_address: req.body.dropoff_address,
        dropoff_phone_number: req.body.dropoff_phone_number,
        dropoff_business_name: req.body.dropoff_business_name,
        dropoff_notes: req.body.dropoff_notes,

        quote_id: req.body.quote
    }, function(err, response) {
        if(err) console.log(err);
        res.send(response);
    });
});

//Get all deliveries
router.get("/deliveries", function(req, res) {
    postmates.list(function(err, response) {
        if(response.body == undefined) {
            res.send("error");
        }
        res.send(response.body);
    });
});

module.exports = router;