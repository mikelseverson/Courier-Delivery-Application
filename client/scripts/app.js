var myApp = angular.module('YourMarket', ['ngMaterial', 'ngRoute', 'appControllers', 'uiGmapgoogle-maps']);
var appControllers = angular.module('appControllers', []);

myApp.config(['$routeProvider', 'uiGmapGoogleMapApiProvider', function($routeProvider, uiGmapGoogleMapApiProvider){

    uiGmapGoogleMapApiProvider.configure({
        v: '3.20',
        libraries: 'weather,geometry,visualization'
    });
    $routeProvider.
        when('/home', {
            templateUrl: "/assets/views/routes/home.html"
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
        when('/:category', {
            templateUrl: "/assets/views/routes/category.html",
            controller: "CategoryController"
        }).
        when('/:category/:product', {
            templateUrl: "/assets/views/routes/product.html",
            controller: "ProductController"
        }).
        otherwise({ //Catch-all for routes not listed above
            redirectTo: "/home"
        })
}]);

myApp.controller("AppCtrl", ["$scope", "$mdSidenav","$http", function($scope, $mdSidenav, $http) {
    $scope.toggleSidenav = function (a) {
        $mdSidenav(a).toggle()
    };
    $scope.getData = function() {
        $http.get("/category/all").then(function (res) {
            console.log(res.data);
            $scope.categories = res.data;
        });
    };
    $http.get("/category/all").then(function (res) {
        console.log("received store data", res.data);
        $scope.categories = res.data;
    });
}]);
