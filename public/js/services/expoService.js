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
