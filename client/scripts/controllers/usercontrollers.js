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
    console.log($scope.user);
    if(!$scope.user) $location.path('/');
    else {
        $scope.map = {
            center: {latitude: 44.9778, longitude: -93.2650},
            zoom: 12,
            options: {
                panControl       : false,
                zoomControl      : false,
                scaleControl     : false,
                mapTypeControl   : false,
                draggable        : false,
                scrollwheel      : false,
                streetViewControl: false
            }
        };
        $scope.markers = [];
        angular.forEach($scope.user.orders, function(order, index) {
            console.log(order.deliveryObject);
            if(!order.deliveryObject.complete) {
                $http.post("/postmates/update", order), function(req,res) {
                    console.log(res);
                }
                if(order.deliveryObject.courier) {
                    $scope.markers.push({
                        id: index,
                        coords: {
                            latitude: order.deliveryObject.delivery.courier.location.lat,
                            longitude: order.deliveryObject.delivery.courier.location.lng
                        }
                    })

                }
            }
        });

    }
}]);
