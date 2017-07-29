(function() {

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    
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
            console.log('New Supplier');
            $location.path("/new-supplier");
        }
        
        $scope.editSupplier = function(index) {
            console.log('Edit Supplier');
            $location.path('/edit-supplier/' + $scope.suppliers[index].id);
        }

        $scope.delSupplier = function(index) {
            console.log('Delete Supplier');
            var todel = $scope.suppliers[index];
            $http
                    .delete($rootScope.appUrl + '/api/Suppliers/delete/' + todel.id + '.json')
                    .success(function(data, status, headers, config) {
                        load();
                    }).error(function(data, status, headers, config) {
            });
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
	
	as.controller('EditSupplierCtrl', function($scope, $rootScope, $http, $routeParams, $location) {
        console.log('Edit Supplier Controller');
        
        var load = function() {
            console.log('call load Supplier...');
            $http.get($rootScope.appUrl + '/api/Suppliers/view/' + $routeParams['id'] + '.json')
                    .success(function(data, status, headers, config) {
                        $scope.supplier = data.supplier;
                        angular.copy($scope.supplier, $scope.copy);
                    });
        }

        load();

        $scope.supplier = {};

        $scope.updateSupplier = function() {
            console.log('call update Supplier');
        
            var _data = {};
                delete $scope.supplier.created;
                $scope.supplier.modified = dateTime;
                _data = $scope.supplier;
                            
                $http
                    .put($rootScope.appUrl + '/api/Suppliers/edit/' + $scope.supplier.id + '.json', _data)
                    .success(function(data, status, headers, config) {
                        $location.path('/suppliers/');
                    }).error(function(data, status, headers, config) {
            });
        }
        
        
	});
	
}());    
