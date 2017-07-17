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
    
    });

}());    
