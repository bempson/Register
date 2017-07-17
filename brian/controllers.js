var app = angular.module('appControllers', []);
 
    app.controller('AppCtrl', function($scope, $rootScope) {
	    
	    $scope.activeWhen = function(value) {
            return value ? 'active' : '';
        };
        
	    $rootScope.appUrl = "http://10.186.168.243/crafts-af";
	});
	
