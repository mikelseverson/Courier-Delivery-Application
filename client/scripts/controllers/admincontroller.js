/**
 * Created by mikelseverson on 9/7/15.
 */
myApp.controller('AdminController', ['$scope', '$http', 'Auth', function($scope, $http, Auth) {

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

    $scope.createProduct = function() {
        if($scope.categoryId != null && $scope.url_slug != undefined && $scope.price != undefined) {
            $http.post("/product/create", {
                category : $scope.categoryId,
                desc : $scope.description,
                price : $scope.price,
                name : $scope.name,
                img_src : $scope.img_src,
                url_slug : $scope.url_slug
            }).then(function(response) {
                console.log(response);
                $scope.getData();
            });
        }
    };

    $scope.deleteProduct = function(categoryId, productId) {
        $http.post("/product/delete", {
            categoryId : categoryId,
            productId : productId
        }).then(function(response) {
            $scope.getData();
            console.log(response);
        })
    };

    $scope.createCategory = function(categoryName, URLSlug) {
        if(categoryName == null) {
            console.log("no category name");
        }
        else if(URLSlug == null) {
            console.log("no url slug");
        }
        else {
            $http.post("/category/create", {
                name : categoryName,
                url  : URLSlug
            }).then(function(response) {
                if(response.data.errmsg == undefined) {
                    $scope.getData();

                }
                else {
                    console.log(response.data.errmsg);
                }
            });
        }
    };

    $scope.deleteCategory = function(categoryId) {
        $http.post("/category/delete", {
            categoryId : categoryId
        }).then(function(response) {
            if(response.status != '200') {

            }
            $scope.getData();
            console.log(response);
        });
    };

}]);