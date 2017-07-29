(function() {

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    
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
		
		$scope.addCustomer = function() {
            console.log('call addCustomer');
            $location.path("/new-customer");
        }

        $scope.editCustomer = function(index) {
            console.log('call editCustomer');
            $location.path('/edit-customer/' + $scope.customers[index].id);
        }

        $scope.delCustomer = function(index) {
            console.log('call delCustomer');
            var todel = $scope.customers[index];
            $http
                    .delete($rootScope.appUrl + '/api/customers/delete/' + todel.id + '.json')
                    .success(function(data, status, headers, config) {
                        load();
                    }).error(function(data, status, headers, config) {
            });
        }
        
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

    /********************************************* 
     * Edit Custormer
     *********************************************/	
    as.controller('EditCustomerCtrl', function($scope, $rootScope, $http, $routeParams, $location) {

        var load = function() {
            console.log('call load()...');
            $http.get($rootScope.appUrl + '/api/Customers/view/' + $routeParams['id'] + '.json')
                    .success(function(data, status, headers, config) {
                        $scope.customer = data.customer;
                        angular.copy($scope.customer, $scope.copy);
                    });
        }

        load();

        $scope.customer = {};

        $scope.updateCustomer = function() {
            console.log('call updateCustomer');
        
            var _data = {};
                delete $scope.customer.created;
                $scope.customer.modified = dateTime;
                _data = $scope.customer;
                            
                $http
                    .put($rootScope.appUrl + '/api/Customers/edit/' + $scope.customer.id + '.json', _data)
                    .success(function(data, status, headers, config) {
                        $location.path('/customers');
                    }).error(function(data, status, headers, config) {
            });
        }
    });
    
}());
