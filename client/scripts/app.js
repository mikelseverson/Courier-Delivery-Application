var myApp = angular.module('YourMarket', ['ngMaterial', 'ngRoute', 'uiGmapgoogle-maps']);

myApp.config(['$routeProvider', 'uiGmapGoogleMapApiProvider', function($routeProvider, uiGmapGoogleMapApiProvider){

    uiGmapGoogleMapApiProvider.configure({
        v: '3.20',
        libraries: 'weather,geometry,visualization'
    });
    $routeProvider.
        when('/home', {
            templateUrl: "/assets/views/routes/home.html"
        }).
        when('/login', {
            templateUrl: "/assets/views/routes/login.html",
            controller: 'LoginController'
        }).
        when('/user', {
            templateUrl: "/assets/views/routes/user.html",
            controller: 'UserController'
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

myApp.controller("AppCtrl", ["$scope", "$mdSidenav", "$http", "Auth",  "$location", function($scope, $mdSidenav, $http, Auth, $location) {
    $scope.toggleSidenav = function (a) {
        $mdSidenav(a).toggle()
    };

    //Watch for authentication change
    $scope.$watch(Auth.isLoggedIn, function (value, oldValue) {
        if (!value && oldValue) {
            console.log("Disconnected");
            $scope.user = {};
            $location.path('/login');
        }
        if (value) {
            $scope.user = value;
        }
    }, true);

    //Update store data
    $scope.getData = function() {
        $http.get("/category/all").then(function (res) {
            $scope.categories = res.data.storeData;
            Auth.setUser(res.data.userObject)
        });
    };
    $scope.getData();
}]);

//Handles client side user object
myApp.factory('Auth', function(){
    var user;
    return {
        setUser : function(aUser){
            user = aUser;
        },
        isLoggedIn : function(){
            return(user) ? user : false;
        }
    }
});
