(function() {

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    
    var as = angular.module('crafts.controllers')
    
    /*********************************************   
     * Department Controller
     *********************************************/
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
        
        $scope.editDepartment = function(index) {
            console.log('call Edit Department');
            $location.path("/edit-department/" + $scope.departments[index].id);
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

    /*********************************************   
     * New Department Controller
     *********************************************/
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
	
	/*********************************************   
     * Edit Department Controller
     *********************************************/
	as.controller('EditDepartmentCtrl', function($scope, $rootScope, $http, $routeParams, $location) {

        var load = function() {
            console.log('call Edit Department...');
            $http.get($rootScope.appUrl + '/api/Departments/view/' + $routeParams['id'] + '.json')
                    .success(function(data, status, headers, config) {
                        $scope.department = data.department;
                        angular.copy($scope.department, $scope.copy);
                    });
        }

        load();

        $scope.department = {};

        $scope.updateDepartment = function() {
            console.log('call Update Departments');
        
            var _data = {};
                delete $scope.department.created;
                $scope.department.modified = dateTime;
                _data = $scope.department;
                            
                $http
                    .put($rootScope.appUrl + '/api/Departments/edit/' + $scope.department.id + '.json', _data)
                    .success(function(data, status, headers, config) {
                        $location.path('/departments');
                    }).error(function(data, status, headers, config) {
            });
        }
    });
    
}());    
