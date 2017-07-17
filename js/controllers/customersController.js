(function() {

    var as = angular.module('crafts.controllers');
    
    /*********************************************   
     * Customers Controller  
     *********************************************/
    as.controller('CustomersCtrl', function($scope, $rootScope, $http, $location) {
		var load = function() {
            $http.get($rootScope.appUrl + '/api/Customers.json')
                .success( function(data, status, headers, config) {
					$scope.customers = data.customers;
				});
		}
		load();
	});

    /********************************************* 
     * New Custormer
     *********************************************/
    as.controller('NewCustomerCtrl', function($scope, $rootScope, $http, $location) {
		
		$scope.saveCustomer = function() {
            console.log(' ... call save Customer ... ');
            var _data = {};
            _data = $scope.customer;

            $http
	            .post($rootScope.appUrl + '/api/Customers/add/add.json' , _data)
	            .success(
	                function(data, status, headers, config) {
						$scope.customer = data.customer;
						$location.path('/customers/');
		            }
		        )
	            .error(
	                function(data, status, headers, config) { }
                );
        }
	});
	
}());
