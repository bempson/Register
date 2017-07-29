(function() {

var as = angular.module('crafts.controllers')
    
    as.controller('DepartmentsCtrl', function($scope, $rootScope, $http, $location) {
        var load = function() {

            console.log('call load()... ');

            $http.get($rootScope.appUrl + '/api/Departments.json')

                    .success(function(data, status, headers, config) {
                        console.log('SUCCESS!!!  ');
                        $scope.departments = data.departments;
                    });
        }

        load();
        
        $scope.newDepartment = function() {
            console.log('call New Department');
            $location.path("/new-department");
        }
        
        $scope.delDepartment = function(index) {
            console.log('Delete Department');
            var todel = $scope.departments[index];
            $http
                    .delete($rootScope.appUrl + '/api/Departments/delete/' + todel.id + '.json')
                    .success(function(data, status, headers, config) {
                        load();
                     })
                    .error(function(data, status, headers, config) {});
        };
    
    });

    as.controller('NewDepartmentCtrl', function($scope, $rootScope, $http, $location) {
        
        $scope.department = {};

        $scope.saveDepartment = function() {
			console.log('Submit Department');
		    var _data = {};
            _data = $scope.department;

            $http
	            .post($rootScope.appUrl + '/api/Departments/add/add.json' , _data)
	            .success(
	                function(data, status, headers, config) {
						$scope.departments = data.departments;
						$location.path('/departments/');
		            }
		        )
	            .error(
	                function(data, status, headers, config) { }
                );
		}
		
	});
	
}());    
