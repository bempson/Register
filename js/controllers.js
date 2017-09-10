( function() {

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    
    var as = angular.module('crafts.controllers', []);

    /*********************************************   
     * Application Controller  
     *********************************************/
    as.controller('AppCtrl', function($scope, $rootScope, $http, $location) {

        $scope.activeWhen = function(value) {
            return value ? 'active' : '';
        };

        $scope.path = function() {
            return $location.url();
        };

        $scope.logout = function() {
            $rootScope.user = null;
            $scope.username = $scope.password = null;
            $scope.$emit('event:logoutRequest');
            $location.url('/');
        };

        var ip = location.host;
        $rootScope.appUrl = "http://"+ip +"/register";
        //$rootScope.appUrl = "http://10.186.38.251/crafts-af";

    });

    /*********************************************   
     * Print Controller  
     *********************************************/
    as.controller('printCtrl', function($scope) {
      
        $scope.printToCart = function(printSectionId) {
            var innerContents = document.getElementById(printSectionId).innerHTML;
            var popupWinindow = window.open('', 
               '_blank',
               'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
            popupWinindow.document.open();
            popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="css/app.css" /></head><body>' + innerContents + '</html>');
            popupWinindow.document.close();
        }

    });
 
    /*********************************************
	 * Register Controller
	 *********************************************/
    as.controller('RegisterCtrl', function($scope, $rootScope, $http, $location) {

        $scope.user = {};

        $scope.register = function() {
            console.log('call register');
            var _data = {};
            _data.User = $scope.user;
            $http
                    .post($rootScope.appUrl + '/users/add.json', _data)
                    .success(function(data, status, headers, config) {
                        $location.path('/login');
                    })
                    .error(function(data, status, headers, config) {
                    });
        }
    });

    /*********************************************
	 * Login  Controller
	 *********************************************/
    as.controller('LoginCtrl', function($scope, $rootScope, $http, $location) {
        $scope.login = function() {
            $scope.$emit('event:loginRequest', $scope.username, $scope.password);
            //$location.path('/login');
        };
    });
    
    /*********************************************
	 * Test  Controller
	 *********************************************/
	as.controller('TestPageCtrl', function($scope, $rootScope, $http, $location, $timeout) {
		
		console.log(' ... TEST PAGE!!! ... ');
		$scope.transaction = {};
		
        var transid = 6;		
        var trans = function() {

            $http
                .get($rootScope.appUrl + '/api/Transactions/bySaleId/' + transid + '.json')
                .success(function(data, status, headers, config) {
				    var count = data.transaction.length;
                    $scope.transaction = data.transaction;

                    if ( count > 0) {
			            console.log(' ... Transactions Found!!! ... ' + count + ' ... '); 
		            } else {
			            console.log(' ... NO Transactions Found!!! ... ' + count + ' ... ');
		            }
		        });
         }
         
         trans();
            
	});

}());
