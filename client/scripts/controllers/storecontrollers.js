/**
 * Created by mikelseverson on 9/7/15.
 */
myApp.controller('CategoryController', ['$scope', '$routeParams', '$location', function($scope, $routeParams, $location) {
    $scope.category = $routeParams.category;
    angular.forEach($scope.categories, function(category) {
        if(category.url == $scope.category) {
            $scope.products = category.products
        }
    });

    $scope.categoryClick = function(category, product) {
        console.log(category, product);
        $location.path('/' + category + '/' + product);

    }

}]);

myApp.controller('ProductController', ['$scope', '$routeParams', function($scope, $routeParams) {
    $scope.product = $routeParams.product;
    $scope.category = $routeParams.category;
    angular.forEach($scope.categories, function(category) {
        if(category.url == $routeParams.category) {
            angular.forEach(category.products, function(product) {
                if(product.url_slug == $routeParams.product) {
                    $scope.productData = product;
                }
            })
        }
    })
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
        $http.post("/postmates/create", {
            quote : quoteID,
            dropoff_address: $scope.delivery.destination,
            dropoff_phone_number: $scope.delivery.phone_number,
            dropoff_name: $scope.delivery.dropoff_name,
            dropoff_business_name: $scope.dropoff_business_name,
            dropoff_notes: $scope.dropoff_notes })
            .then(function(response) {
                if(response.status != 200) {
                    console.log("error");
                }
                else {
                    $scope.orderDetails = response.data;
                    console.log(response.data);
                }
            })
    }
}
]);