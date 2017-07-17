(function() {

    var as = angular.module('crafts.controllers');
    
    as.controller('CategoriesCtrl', function($scope, $rootScope, $http, $location) {
        var load = function() {

            console.log(' ... Categories Controller ... ');

            $http.get($rootScope.appUrl + '/api/Categories.json')

                    .success(function(data, status, headers, config) {
                        console.log('SUCCESS!!!  ');
                        $scope.categories = data.categories;
                    });
        }

        load();
        
        $scope.newCategory = function() {
            console.log('call New Category');
            $location.path("/new-category");
        }
    
    });

    as.controller('NewCategoryCtrl', function($scope, $rootScope, $http, $location) {
	    
	    var getdep = function() {
            $http.get($rootScope.appUrl + '/api/Departments.json')
                    .success(function(data, status, headers, config) {
                        $scope.departments = data.departments;                      
                    });
        }
        getdep();
        
        $scope.category = {};

        $scope.saveCaegory = function() {
		    var _data = {};
            _data = $scope.category;

            $http
	            .post($rootScope.appUrl + '/api/Categories/add/add.json' , _data)
	            .success(
	                function(data, status, headers, config) {
						$scope.categories = data.categories;
						$location.path('/categories/');
		            }
		        )
	            .error(
	                function(data, status, headers, config) { }
                );
		}
	
	});
}());    
