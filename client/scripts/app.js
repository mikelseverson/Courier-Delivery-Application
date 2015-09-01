var myApp = angular.module('YourMarket', ['ngMaterial', 'ngRoute', 'appControllers']);
var appControllers = angular.module('appControllers', []);

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.
        when('/home', {
            templateUrl: "/assets/views/routes/home.html"
        }).
        when('/category/:category', {
            templateUrl: "/assets/views/routes/category.html",
            controller: "CategoryController"
        }).
        when('/category/:category/product/:product', {
            templateUrl: "/assets/views/routes/product.html",
            controller: "ProductController"
        }).
        when('/about', {
            templateUrl: "/assets/views/routes/about.html"
        }).
        when('/login', {
            templateUrl: "/assets/views/routes/login.html"
        }).
        when('/register', {
            templateUrl: "/assets/views/routes/register.html"
        }).
        when('/admin', {
            templateUrl: "/assets/views/routes/admin.html",
            controller: 'AdminController'
        }).
        otherwise({ //Catch-all for routes not listed above
            redirectTo: "/home"
        })
}]);

myApp.controller("AppCtrl", ["$scope", "$mdSidenav","$http", function($scope, $mdSidenav, $http) {
    $scope.toggleSidenav = function (a) {
        $mdSidenav(a).toggle()
    };
    $http.get("/category/all").then(function (res) {
            $scope.categories = res.data;
    });
}]);
