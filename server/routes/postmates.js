var express = require('express'),
    path = require('path'),
    Postmates = require('postmates');

var postmates = new Postmates('cus_KKTBUzym9jC16k', '6854a484-6226-43b8-ab7f-0890841bee0a');
var router = express.Router();

//Query Postmates for delivery quote
router.post("/query", function(request, response) {
    postmates.quote({
        dropoff_address: request.body.dropoff_address,
        pickup_address: "310 Hennepin Ave E, Minneapolis, MN 55414"
    }, function(err, res) {
        response.send(res.body);
    });
});

//Submit delivery to postmates
router.post("/create", function(req, res) {
    postmates.new({
        manifest: "a box of kittens",

        pickup_name: "Truecost Farms",
        pickup_address: "310 Hennepin Ave E, Minneapolis, MN 55414",
        pickup_phone_number: "000-000-0000",
        //pickup_business_name: "",
        //pickup_notes: "",

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