var app = angular.module('appRoutes', ['ngRoute']);

    app.config(function($routeProvider) {
    
        $routeProvider
            .when('/transactions',   {templateUrl: 'views/transactions.html' })
            .when('/new-trans',      {templateUrl: 'views/new-trans.html'    })
            .when('/edit-trans/:id', {templateUrl: 'views/edit-trans.html'   })
        
            .otherwise('/');
    });
