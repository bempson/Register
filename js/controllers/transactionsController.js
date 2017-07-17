(function() {

    var as = angular.module('crafts.controllers');
    
    /*********************************************   
     * Transactoin Controller  
     *********************************************/
    as.controller('TransListCtrl', function($scope, $rootScope, $http, $location) {
        var load = function() {

            console.log('call load()... ');

            $http.get($rootScope.appUrl + '/api/Transactions.json')
                    .success(function(data, status, headers, config) {
                        $scope.transactions = data.transactions;                      
                    });
        }

        load();
        
        $scope.newTrans = function() {
            console.log('call newTrans');
            $location.path("/new-trans");
        }
        
        $scope.editTrans = function(index) {
            console.log('call editTrans');
            console.log($scope);
            $location.path('/edit-trans/' + $scope.transactions[index].id);
        }
        
        $scope.delPost = function(index) {
            console.log('call delTrans');
            var todel = $scope.transactions[index];
            $http
                    .delete($rootScope.appUrl + '/api/transactions/delete/' + todel.id + '.json')
                    .success(function(data, status, headers, config) {
                        load();
                    }).error(function(data, status, headers, config) {
            });
        }

    });

    /****** New Transaction ******/
    as.controller('NewTransCtrl', function($scope, $rootScope, $http, $location) {

        $scope.transaction = {};

        $scope.saveTransaction = function() {
            console.log('call saveTransaction');
            var _data = {};
            _data = $scope.transaction;
            if ($scope.transaction.taxable == true) {
                $scope.transaction.taxable = '1';
			} else {
				$scope.transaction.taxable = '0';
			}
			
            console.log(_data);
            $http
                    .post($rootScope.appUrl + '/api/Transactions/add/add.json', _data)
                    .success(function(data, status, headers, config) {
                        $location.path('/transactions');
                    }).error(function(data, status, headers, config) {
            });
        }
    });

    /****** Edit Transaction ******/
    as.controller('EditTransCtrl', function($scope, $rootScope, $http, $routeParams, $location) {

        var load = function() {
            console.log('call load()...');
            $http.get($rootScope.appUrl + '/api/Transactions/view/' + $routeParams['id'] + '.json')
                    .success(function(data, status, headers, config) {
                        $scope.transaction = data.transaction;
                        angular.copy($scope.transaction, $scope.copy);
                    });
        }

        load();
        
        $scope.transaction = {};
        
        $scope.updateTransaction = function() {
            console.log('call updateTransaction');
        
            var _data = {};
                delete $scope.transaction.product;
                delete $scope.transaction.order;
                delete $scope.transaction.sale;
                
                delete $scope.transaction.created;
                $scope.transaction.modified = dateTime;
                                
                if ($scope.transaction.taxable == true) {
                    $scope.transaction.taxable = '1';
			    } else {
				    $scope.transaction.taxable = '0';
			    }
			    
                _data = $scope.transaction;
                
                //console.log(_data);            
                $http
                    .put($rootScope.appUrl + '/api/Transactions/edit/' + $scope.transaction.id + '.json', _data)
                    .success(function(data, status, headers, config) {
                        $location.path('/transactions');
                    }).error(function(data, status, headers, config) {
            });
        }
    });

}());
