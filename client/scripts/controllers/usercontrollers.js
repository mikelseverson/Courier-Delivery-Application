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

    $scope.getPostmatesDeliveries = function() {
        $scope.markers = [];
        $http.get("/postmates/deliveries").then(function(res) {
            console.log("received delivery data", res.data);
            $scope.delivery = res.data;

            angular.forEach(res.data.data, function(delivery, index) {
                if(delivery.courier != null) {
                    $scope.markers.push({
                        id: index,
                        icon : "assets/images/car.png",
                        coords: {
                            latitude: delivery.courier.location.lat,
                            longitude: delivery.courier.location.lng
                        }
                    })
                }
            })

        });
    };

    $scope.getPostmatesDeliveries();

    $scope.postmatesExampleOrder = function() {
        $http.post("/postmates/query", {
            dropoff_address: "1750 Hennepin Ave Minneapolis, MN 55403"
        }).then(function(response) {
            console.log(response.data);
            $http.post("/postmates/create", {
                quote : response.data,
                dropoff_address: "1750 Hennepin Ave Minneapolis, MN 55403",
                dropoff_phone_number: "123-456-7890",
                dropoff_name: "demo",
                dropoff_notes: "demo"
            }).then(function(response) {
                $scope.getData();
                console.log(response.data);
            })
        })
    };

}]);
