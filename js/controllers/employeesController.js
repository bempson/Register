(function() {

    var as = angular.module('crafts.controllers');
    
    /*** Employee Controller ***/
    as.controller('EmployeesCtrl', function($scope, $rootScope, $http, $location) {
        var load = function() {

            console.log(' ... Employees Controller ... ');

            $http.get($rootScope.appUrl + '/api/Employees.json')

                    .success(function(data, status, headers, config) {
                        console.log('SUCCESS!!!  ');
                        $scope.employees = data.employees;
                    });
        }

        load();
        
        $scope.newEmployee = function() {
            console.log('call New Employee');
            $location.path("/new-employee");
        }
        
        $scope.editEmployee = function(index) {
			console.log(' ... Edit Employee ... ');
            $location.path('/edit-employee/' + $scope.employees[index].id);
        }
    
    });

    /*** New Employee Controller ***/
    as.controller('NewEmployeeCtrl', function($scope, $rootScope, $http, $location) {
	    
        $scope.employee = {};

        $scope.saveEmployee = function() {
		    var _data = {};
            _data = $scope.employee;

            $http
	            .post($rootScope.appUrl + '/api/Employees/add/add.json' , _data)
	            .success(
	                function(data, status, headers, config) {
						$scope.employees = data.employees;
						$location.path('/employees/');
		            }
		        )
	            .error(
	                function(data, status, headers, config) { }
                );
		}
	
	});
	
	/*** Edit Employee Controller***/
	as.controller('EditEmployeeCtrl', function($scope, $rootScope, $http, $routeParams, $location) {
		
        console.log(' >>>  Edit Employee Controller  <<< ');
        
        $scope.employee = {};
        
        var load = function() {
            console.log(' ... Current Employee ... ');
            $http.get($rootScope.appUrl + '/api/Employees/view/' + $routeParams['id'] + '.json')
                    .success(function(data, status, headers, config) {
                        $scope.employee = data.employee;
                    });
        }

        load();
        
        $scope.saveEmployee = function() {
		    var _data = {};
		    
            delete $scope.employee.orders;
            delete $scope.employee.sales;
            delete $scope.employee.users;
            
            delete $scope.employee.modified;
            delete $scope.employee.created;
            
            _data = $scope.employee;
            console.log($scope);
            $http.put($rootScope.appUrl + '/api/Employees/edit/' + $scope.employee.id + '.json' , _data)
	             .success(
	                function(data, status, headers, config) {
						$scope.employees = data.employees;
						$location.path('/employees/');
		            }
		        )
	             .error(
	                function(data, status, headers, config) { }
                );
		}
	
	});
	
}());    
