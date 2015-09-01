myApp.controller('CategoryController',['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
    $scope.category = $routeParams.category;

    angular.forEach($scope.categories, function(category) {
        if(category.url == $scope.category) {
            $scope.products = category.products
        }
    })
}]);

myApp.controller('ProductController',['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
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
        console.log("Attempting to create delivery from quote " + quoteID);
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
        console.log("received delivery data", res.data);
        $scope.delivery = res.data;
    });

    $scope.createProduct = function() {
        if($scope.categoryId != null) {
            $http.post("/product/create", {
                category : $scope.categoryId,
                desc : $scope.description,
                price : $scope.price,
                name : $scope.name,
                img_src : $scope.img_src,
                url_slug : $scope.url_slug
            }).then(function(response) {
                $scope.getData();
            });
        }
    };

    $scope.selectCategory = function(chip) {
        console.log(chip);
        $scope.categoryId = chip._id;
    };

    $scope.createCategory = function() {
        $http.post("/category/create", {
            name : $scope.newCategory,
            url  : $scope.urlSlug,
            description : $scope.newDescription
        }).then(function(response) {
            $scope.categories.push(response.data);
        });
    };
}]);