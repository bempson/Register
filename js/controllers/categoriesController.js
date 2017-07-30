(function() {

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    
    var as = angular.module('crafts.controllers');
    
    as.controller('CategoriesCtrl', function($scope, $rootScope, $http, $location) {
        var load = function() {

            console.log(' ... Categories Controller ... ');

            $http.get($rootScope.appUrl + '/api/Categories.json')

                    .success(function(data, status, headers, config) {
                        console.log('Get Category Data...');
                        $scope.categories = data.categories;
                    });
        }

        load();
        
        $scope.newCategory = function() {
            console.log('call New Category');
            $location.path("/new-category");
        }

        $scope.editCategory = function(index) {
            console.log('call editCategory');
            $location.path('/edit-category/' + $scope.categories[index].id);
        }

        $scope.delCategory = function(index) {
            console.log('call delCategory');
            var todel = $scope.categories[index];
            $http
                    .delete($rootScope.appUrl + '/api/categories/delete/' + todel.id + '.json')
                    .success(function(data, status, headers, config) {
                        load();
                    }).error(function(data, status, headers, config) {
            });
        }
            
    });

    as.controller('NewCategoryCtrl', function($scope, $rootScope, $http, $location) {

        $scope.category = {};

        $scope.saveCategory = function() {
			console.log('call Save Category...');
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
	    
	as.controller('EditCategoryCtrl', function($scope, $rootScope, $http, $routeParams, $location) {
    
        var load = function() {
            console.log('Grab Category '+ $routeParams['id'] +' ...');
            $http.get($rootScope.appUrl + '/api/Categories/view/' + $routeParams['id'] + '.json')
                    .success(function(data, status, headers, config) {
                        $scope.category = data.category;
                        angular.copy($scope.category, $scope.copy);
                    });
        }

        load();

        $scope.category = {};

        $scope.updateCategory = function() {
            console.log('Call Update Category...');
        
            var _data = {};
            
                delete $scope.category.created;
                $scope.category.modified = dateTime;
                _data = $scope.category;
                            
                $http
                    .put($rootScope.appUrl + '/api/Categories/edit/' + $scope.category.id + '.json', _data)
                    .success(function(data, status, headers, config) {
                        $location.path('/categories');
                    }).error(function(data, status, headers, config) {
            });
        }
    });
    
}());    
