/**
 * Created by mikelseverson on 9/7/15.
 */
myApp.controller('LoginController', ['$location', '$scope', '$http', 'Auth', function($location, $scope, $http, Auth) {

    $scope.login = function(username, password) {
        $http.post("/login", {username : username, password: password}).then(function(response) {
            Auth.setUser(response.data);
            $location.path('/user');
        })
    };

    $scope.register = function(username, password) {
        $http.post("/register", {username : username, password: password}).then(function(response) {
            Auth.setUser(response.data);
            $location.path('/user');
        })
    };
}]);

myApp.controller('UserController', ['$scope', '$http', 'Auth', '$location', function($scope, $http, Auth, $location) {
    if(!$scope.user) {
        $location.path('/')
    }
}]);
