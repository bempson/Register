(function() {

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    
    var as = angular.module('crafts.controllers');
    
    /*********************************************   
     * Products Controller  
     *********************************************/
    as.controller('ProductCtrl', function($scope, $rootScope, $http, $location) {
        var load = function() {
			console.log('call load(/api/Products.json) ');
            $http.get($rootScope.appUrl + '/api/Products.json')
                .success( function(data, status, headers, config) {
					$scope.products = data.products;
                    angular.copy($scope.products, $scope.copy);
				});
		}
		load();
		
		$scope.newProd = function() {
            console.log('call newProd');
            $location.path("/new-prod");
        }
        
        $scope.editProduct = function(index) {
            $location.path('/edit-prod/' + $scope.products[index].id);
        }
        
    });
    
    /***  New Product ***/
    as.controller('NewProductCtrl', function($scope, $rootScope, $http, $location) {

        var getcat = function() {
            $http.get($rootScope.appUrl + '/api/Categories.json')
                    .success(function(data, status, headers, config) {
                        $scope.categories = data.categories;                      
                    });
        }
        getcat();

        var getsup = function() {
            $http.get($rootScope.appUrl + '/api/Suppliers.json')
                    .success(function(data, status, headers, config) {
                        $scope.suppliers = data.suppliers;                      
                    });
        }
        getsup();

        var getdep = function() {
            $http.get($rootScope.appUrl + '/api/Departments.json')
                    .success(function(data, status, headers, config) {
                        $scope.departments = data.departments;                      
                    });
        }
        getdep();
        
        $scope.product = {};
        $scope.product.units_in_stock = 0;
        
        $scope.UpdateUnits = function() {
		    $scope.product.units_in_stock = parseInt($scope.product.units_in_stock) + parseInt($scope.product.units);
		}

        $scope.saveProduct = function() {
            console.log(' ... call save Product ... ');
            var _data = {};
            _data = $scope.product;

            $http
	            .post($rootScope.appUrl + '/api/Products/add/add.json' , _data)
	            .success(
	                function(data, status, headers, config) {
						$scope.product = data.product;
						$location.path('/products/');
		            }
		        )
	            .error(
	                function(data, status, headers, config) { }
                );
        }
    });
    
    /*** Edit Products ***/
    as.controller('EditProductCtrl', function($scope, $rootScope, $http, $routeParams, $location) {
		
		$scope.product = {};
		
		var load = function() {
            console.log(' ... Current Product ... ');
            $http.get($rootScope.appUrl + '/api/Products/view/' + $routeParams['id'] + '.json')
                    .success(function(data, status, headers, config) {
                        $scope.product = data.product;
                    });
        }

        load();
        
		var getcat = function() {
            $http.get($rootScope.appUrl + '/api/Categories.json')
                    .success(function(data, status, headers, config) {
                        $scope.categories = data.categories;                      
                    });
        }
        getcat();

        var getsup = function() {
            $http.get($rootScope.appUrl + '/api/Suppliers.json')
                    .success(function(data, status, headers, config) {
                        $scope.suppliers = data.suppliers;                      
                    });
        }
        getsup();

        var getdep = function() {
            $http.get($rootScope.appUrl + '/api/Departments.json')
                    .success(function(data, status, headers, config) {
                        $scope.departments = data.departments;                      
                    });
        }
        getdep();
        
        $scope.UpdateUnits = function() {
		    $scope.product.units_in_stock = parseInt($scope.product.units_in_stock) + parseInt($scope.product.units);
		}

        console.log($scope);
        
        $scope.saveProduct = function() {
            console.log(' ... call save Product ... ');
            
            delete $scope.product.units;
            $scope.product.units = 0;
            
            delete $scope.product.created;
            $scope.product.modified = dateTime;

            var _data = {};
            _data = $scope.product;

            console.log(_data);
            $http
	            .post($rootScope.appUrl + '/api/Products/edit/' + $scope.product.id + '.json' , _data)
	            .success(
	                function(data, status, headers, config) {
						$scope.product = data.product;
						$location.path('/products/');
		            }
		        )
	            .error(
	                function(data, status, headers, config) { }
                );
        }
	});
	
}());
