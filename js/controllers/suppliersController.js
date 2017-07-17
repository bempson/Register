(function() {

    var as = angular.module('crafts.controllers');
    
    as.controller('SuppliersCtrl', function($scope, $rootScope, $http, $location) {
        var load = function() {

            console.log(' ... Suppliers Controller ... ');

            $http.get($rootScope.appUrl + '/api/Suppliers.json')

                    .success(function(data, status, headers, config) {
                        $scope.suppliers = data.suppliers;
                    });
        }

        load();
        
        $scope.newSupplier = function() {
            console.log('call New Supplier');
            $location.path("/new-supplier");
        }
    
    });

    as.controller('NewSupplierCtrl', function($scope, $rootScope, $http, $location) {
	    
        $scope.suppliers = {};

        $scope.saveSupplier = function() {
		    var _data = {};
            _data = $scope.supplier;

            $http
	            .post($rootScope.appUrl + '/api/Suppliers/add/add.json' , _data)
	            .success(
	                function(data, status, headers, config) {
						$scope.suppliers = data.suppliers;
						$location.path('/suppliers/');
		            }
		        )
	            .error(
	                function(data, status, headers, config) { }
                );
		}
	
	});
}());    
