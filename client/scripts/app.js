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
        when('/category/:category/product/:product', { //view product
            templateUrl: "/assets/views/routes/product.html",
            controller: "ProductController"
        }).
        when('/about', {
            templateUrl: "/assets/views/routes/about.html"
        }).
        when('/vendor', {
            templateUrl: "/assets/views/routes/vendor-panel.html",
            controller: 'UserController'
        }).
        when('/vendor-login', {
            templateUrl: "/assets/views/routes/vendor-login.html"
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
    $http.get("/get-categories").then(function (res) {
            console.log(res);
            $scope.categories = res.data;
    });
}]);
