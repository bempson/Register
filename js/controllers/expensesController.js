(function() {

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    
    var as = angular.module('crafts.controllers');
    
    /*********************************************   
     * Expenses Controller  
     *********************************************/
    as.controller('ExpensesCtrl', function($scope, $rootScope, $http, $location) {
		var load = function() {
            $http.get($rootScope.appUrl + '/api/Expenses.json')
                .success( function(data, status, headers, config) {
					$scope.expenses = data.expenses;
				});
		}
		load();
		
		$scope.addExpense = function() {
            console.log('call addExpense');
            $location.path("/new-expense");
        }

        $scope.editExpense = function(index) {
            console.log('call editExpense');
            $location.path('/edit-expense/' + $scope.expenses[index].id);
        }

        $scope.delExpense = function(index) {
            console.log('call delExpense');
            var todel = $scope.expenses[index];
            $http
                    .delete($rootScope.appUrl + '/api/expenses/delete/' + todel.id + '.json')
                    .success(function(data, status, headers, config) {
                        load();
                    }).error(function(data, status, headers, config) {
            });
        }
        
	});

}());
