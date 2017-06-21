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
    $scope.suppliers = ['--supplier', 'New Co Ltd', 'Old Co Ltd'];
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
}]);
angular.module('ExpoService', []).factory('Expo', ['$http', function($http) {

    return {
        // call to get all nerds
        getProductPrice : function(supplier, product) {
            return $http.get('/api/products/'+supplier+'/'+product);
        }
    };       

}]);
