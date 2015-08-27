myApp.controller('CategoryController',['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
    $scope.category = $routeParams.category;
    //Get products within category
    $http.get("/"+ $scope.category +"/products").then(function(res) {
        $scope.products = res.data;
    });
}]);

myApp.controller('ProductController',['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
    $scope.product = $routeParams.product;
    $scope.category = $routeParams.category;
    $http.get("/product/" + $routeParams.product).then(function(res) {
        console.log(res.data[0]);
        $scope.product = res.data[0];
    });
}]);

myApp.controller("QuoteController", ["$scope", "$http", function($scope, $http) {
    var pickupAddress = "310 Hennepin Ave E, Minneapolis, MN 55414";
    var dropoffAddress = "";
    $scope.getQuote = function(delivery) {
        dropoffAddress = delivery.destination;
        $http.post("/postmates/query", {
            dropoff_address: delivery.destination,
            pickup_address: pickupAddress
        }).then(function(response) {
            console.log(response.data);
            $scope.quote = response.data;
            $scope.quote.fee /= 100;
        })
    };
    $scope.sendOrder = function(quoteID) {
        console.log("Attempting to create delivery from order " + quoteID)
        $http.post("/postmates/create", {quote : quoteID, pickup_address: pickupAddress, dropoff_address: dropoffAddress})
            .then(function(response) {
            $scope.orderDetails = response.data;
            console.log(response.data);
            })
        }
    }
]);

myApp.controller('UserController', ['$scope', '$http', function($scope, $http) {
    $http.get("/user").then(function(response) {
        $scope.username = response.data;
    })
}]);

myApp.controller('AdminController', ['$scope', '$http', function($scope, $http) {
    $http.get("/postmates/deliveries").then(function(res) {
        console.log(res.data);ç
        $scope.delivery = res.data;
    });
    $scope.newProduct = function() {
        $http.post("/create-product", {
            category : $scope.category,
            desc : $scope.description,
            price : $scope.price,
            name : $scope.name })
    };
    $scope.getCategories = function() {
        $http.get("/categories").then(function(res) {
            console.log(res);
        })
    };
}]);