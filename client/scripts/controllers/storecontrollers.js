/**
 * Created by mikelseverson on 9/7/15.
 */
myApp.controller('CategoryController', ['$scope', '$routeParams', '$location', function($scope, $routeParams, $location) {
    $scope.category = $routeParams.category;
    angular.forEach($scope.categories, function(category) {
        if(category.url == $scope.category) {
            $scope.products = category.products
        }
    })

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
            $scope.order = response.data;
            $scope.quote = $scope.order.quoteObject;
            $scope.quote.fee /= 100;
        })
    };

    $scope.sendOrder = function(order, dropoffName,dropoffPhoneNumber, dropoffNotes, dropoffBusinessName) {
        order.dropoff_phone_number = dropoffPhoneNumber;
        order.dropoff_name = dropoffName;
        order.dropoff_business_name = dropoffBusinessName;
        order.dropof_notes = dropoffNotes;
        $http.post("/postmates/create", order)
            .then(function(response) {
                $scope.orderDetails = response.data;
                console.log(response.data);

            })
    };
}]);