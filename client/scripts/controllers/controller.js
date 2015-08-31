myApp.controller('CategoryController',['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
    //Sets current category to scope for dom usage
    $scope.category = $routeParams.category;

    //Get products within category
    $http.get("/category/"+ $routeParams.category +"/products").then(function(res) {
        $scope.products = res.data;
    });
}]);

myApp.controller('ProductController',['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
    $scope.product = $routeParams.product;
    $scope.category = $routeParams.category;
    $http.get("/product/" + $routeParams.product).then(function(res) {
        $scope.product = res.data[0];
    });
}]);

myApp.controller("QuoteController", ["$scope", "$http", function($scope, $http) {

    $scope.getQuote = function() {
        $http.post("/postmates/query", {
            dropoff_address: $scope.delivery.destination
        }).then(function(response) {
            console.log(response.data);
            $scope.quote = response.data;
            $scope.quote.fee /= 100;
        })
    };
    $scope.sendOrder = function(quoteID) {
        console.log("Attempting to create delivery from order " + quoteID)
        $http.post("/postmates/create", {
            quote : quoteID,
            dropoff_address: $scope.delivery.destination,
            dropoff_phone_number: $scope.delivery.phone_number,
            dropoff_name: $scope.delivery.dropoff_name,
            dropoff_business_name: $scope.dropoff_business_name,
            dropoff_notes: $scope.dropoff_notes })
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

myApp.controller('AdminController', ['$scope', '$http','$interval', function($scope, $http, $interval) {
    $http.get("/postmates/deliveries").then(function(res) {
        console.log(res.data);
        $scope.delivery = res.data;
    });

    $scope.newProduct = function() {
        $http.post("/product/create", {
            category : $scope.category,
            desc : $scope.description,
            price : $scope.price,
            name : $scope.name,
            img_src : $scope.img_src
        })
    };

}]);