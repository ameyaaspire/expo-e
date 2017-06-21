angular.module('expoApp', ['ui.router','HomeCtrl','ExpoService'])
.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'views/home.html',
            controller:'HomeController'
        });	

});
angular.module('HomeCtrl', []).controller('HomeController', ['$scope', 'Expo', function($scope, Expo) {

    $scope.products = ['--product--', 'Small wongle', 'Large wongle', 'Super wongle', 'Mini wongle'];
    $scope.suppliers = ['New Co Ltd', 'Old Co Ltd'];
    $scope.product = $scope.products[0];
    $scope.supplier = $scope.suppliers[0];
    $scope.getProductDetail = function() {
        Expo.getProductPrice($scope.supplier, $scope.product).then(function(response) {
            if (response.data.product !== null) {
                $scope.showDetails = true;
                $scope.productInfo = response.data.product;
            } else {
                $scope.showDetails = false;
            }
        }, function(response) {
            alert("Some Error Occured In fetching Data");
        });
    };
    $scope.getSupplierList = function() {
        Expo.getSupplierList().then(function(response) {
            if (response.data.suppliers !== null) {
                console.log(response.data.suppliers);
            } else {
                console.log("nothing")
            }
        }, function(response) {
            alert("Some Error Occured In fetching Data",response);
        });
    };
    console.log("asdfsdfsd")
    $scope.getSupplierList();
//end of controllers    
}]);
angular.module('ExpoService', []).factory('Expo', ['$http', function($http) {

    return {
        //function for getting the price 
        getProductPrice : function(supplier, product) {
            return $http.get('/api/price/'+supplier+'/'+product);
        },
        //function for getting the supplier list
        getSupplierList : function() {
        	return $http.get('/api/suppliers/');
        },
        //function for getting the product list for a supplier
        getProductList : function(supplier) {
        	return $http.get('/api/products/'+supplier);
        }
    };       

}]);
