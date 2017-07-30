(function() {

    var
        // the HTTP headers to be used by all requests
        httpHeaders,

        // the message to be shown to the user
        message,

        as = angular.module( 'crafts', [
                                         'crafts.filters', 
                                         'crafts.services', 
                                         'crafts.directives',
                                         'crafts.controllers'
                                       ]);

        as.value('version', '1.0.7');

        as.config(function($routeProvider, $httpProvider) {

            $routeProvider
                .when('/transactions',   {templateUrl: 'views/transactions.html' })
                .when('/new-trans',      {templateUrl: 'views/new-trans.html'    })
                .when('/edit-trans/:id', {templateUrl: 'views/edit-trans.html'   })
                
                .when('/products',       {templateUrl: 'views/products.html'     })
                .when('/new-prod',       {templateUrl: 'views/new-prod.html'     })
                .when('/edit-prod/:id',  {templateUrl: 'views/edit-product.html' })
                
                .when('/sales',          {templateUrl: 'views/sales.html'        })
                .when('/edit-Sale/:id',  {templateUrl: 'views/currentSale.html'  })               
                .when('/new-item/:id',   {templateUrl: 'views/new-item.html'     })
                .when('/add-item/:id',   {templateUrl: 'views/add-item.html'     })
                .when('/delete-item/:id', {templateUrl: 'views/delete-item.html'  })
                .when('/new-sale',       {templateUrl: 'views/new-sale.html'     })
                .when('/edit-item/:id',  {templateUrl: 'views/edit-item.html'    })
                .when('/check-out/:id',  {templateUrl: 'views/checkout.html'     })
                .when('/print-sale/:id', {templateUrl: 'views/printSale.html'    })
                
                .when('/categories',          {templateUrl: 'views/categories.html'      })
                .when('/new-category',        {templateUrl: 'views/new-category.html'    })
                .when('/edit-category/:id',   {templateUrl: 'views/edit-category.html'   })

                .when('/departments',         {templateUrl: 'views/departments.html'     })
                .when('/new-department',      {templateUrl: 'views/new-department.html'  })
                .when('/edit-department/:id', {templateUrl: 'views/edit-department.html' })
                
                .when('/customers',           {templateUrl: 'views/customers.html'       })
                .when('/new-customer',        {templateUrl: 'views/new-customer.html'    })
                .when('/edit-customer/:id',   {templateUrl: 'views/edit-customer.html'   })
                
                .when('/employees',         {templateUrl: 'views/employees.html'    })
                .when('/edit-employee/:id', {templateUrl: 'views/edit-employee.html'})
                .when('/new-employee',      {templateUrl: 'views/new-employee.html' })
                
                .when('/suppliers',         {templateUrl: 'views/suppliers.html'    })
                .when('/new-supplier',      {templateUrl: 'views/new-supplier.html' })
                .when('/edit-supplier/:id', {templateUrl: 'views/edit-supplier.html' })
                
                .when('/posts',          {templateUrl: 'views/posts.html'        })
	            .when('/new-post',       {templateUrl: 'views/new-post.html'     })
	            .when('/edit-post/:id',  {templateUrl: 'views/edit-post.html'    })
	            
	            .when('/print',          {templateUrl:  'views/print.html'       })
	            
                //.when('/new-post', {templateUrl: 'partials/new-post.html', controller: 'NewPostCtrl'})
                //.when('/edit-post/:id', {templateUrl: 'partials/edit-post.html', controller: 'EditPostCtrl'})
                //.when('/register', {templateUrl: 'partials/register.html', controller: 'RegisterCtrl'})
                //.when('/login', {templateUrl: 'partials/login.html'})
                //.when('/profile', {templateUrl: 'partials/profile.html'})
                .otherwise({redirectTo: '/'});

                // $httpProvider.defaults.useXDomain = true;
                // delete $httpProvider.defaults.headers.common["X-Requested-With"];

        });

        as.config( function($httpProvider) {

            //configure $http to catch message responses and show them
            $httpProvider.responseInterceptors.push(
                function($q) {

                    console.log('call response interceptor and set message...');

                    var setMessage = function(response) {

                        //if the response has a text and a type property, it is a message to be shown
                        //console.log('@data'+response.data);

                        if (response.data.message) {
                            message = {
                                text: response.data.message.text,
                                type: response.data.message.type,
                                show: true
                            };
                        }
                    };

                    return function(promise) {
                        return promise.then(

                            //this is called after each successful server request
                            function(response) {
                                setMessage(response);
                                return response;
                            },

                            //this is called after each unsuccessful server request
                            function(response) {
                                setMessage(response);
                                    return $q.reject(response);
                            }
                         );
                     };
                }
            );

            //configure $http to show a login dialog whenever a 401 unauthorized response arrives
            $httpProvider.responseInterceptors.push(
                function($rootScope, $q) {
                        
                    console.log('call response interceptor...');
                    return function(promise) {
                        return promise.then(
                                
                            //success -> don't intercept			
                            function(response) {
                                console.log('Success -> Do Not Intercept...');
                                return response;
                            },
                                
                            //error -> if 401 save the request and broadcast an event
                            function(response) {
                                console.log('execute interceptor, response@' + response.status);
                                if (response.status === 401) {
                                    console.log('catching http status:401');
                                    var deferred = $q.defer(),
                                        req = {
                                             config: response.config,
                                             deferred: deferred
                                        };
                                            
                                        $rootScope.requests401.push(req);
                                        $rootScope.$broadcast('event:loginRequired');
                                        return deferred.promise;
                                } else {
									console.log('catching http status:404 - Not Found!!!');
                                    var deferred = $q.defer(),
                                        req = {
                                             config: response.config,
                                             deferred: deferred
                                        };
                                            
                                        //$rootScope.requests404.push(req);
                                        $rootScope.$broadcast('event:Not Found!!!');
                                        
                                        return deferred.promise;
                                }
                                          return $q.reject(response);
                            }
                        );
                    };
                }
            );

            httpHeaders = $httpProvider.defaults.headers;
            //console.log('http headers:'+ httpHeaders);
        });

        as.run( function($rootScope, $http, $location, base64) {

            //make current message accessible to root scope and therefore all scopes
            $rootScope.message = function() {
                return message;
            };

            /**
             * Holds all the requests which failed due to 401 response.
             */
            $rootScope.requests401 = [];

            $rootScope.$on('event:loginRequired', function() {
                console.log('fire event:loginRequired');
                //  $('#login').modal('show');
                $location.path('/login');
            });

            /**
             * On 'event:loginConfirmed', resend all the 401 requests.
             */
            $rootScope.$on('event:loginConfirmed', function() {
                var i,
                    requests = $rootScope.requests401,
                    retry = function(req) {
                        $http(req.config).then(function(response) {
                            req.deferred.resolve(response);
                        });
                    };

                    for (i = 0; i < requests.length; i += 1) {
                        retry(requests[i]);
                    }
                        
                    $rootScope.requests401 = [];

                    $location.path('/');
            });

            /**
             * On 'event:loginRequest' send credentials to the server.
             */
            $rootScope.$on('event:loginRequest', function(event, username, password) {
                //            httpHeaders.common['Authorization'] = 'Basic ' + base64.encode(username + ':' + password);
                //            $http.get('action/user').success(function (data) {
                //                $rootScope.user = data;
                //                $rootScope.$broadcast('event:loginConfirmed');
                //            });
                console.log('fire event: loginRequest. @event,' + event + ', username @' + username + ', password@' + password);
                
                httpHeaders.common['Authorization'] = 'Basic ' + base64.encode(username + ':' + password);
                $http.get($rootScope.appUrl + '/users/login.json')
                    .success( function(data) {
                        console.log('login data @' + data);
                        $rootScope.user = data.user;
                        $rootScope.$broadcast('event:loginConfirmed');
                    });

            });

            /**
             * On 'logoutRequest' invoke logout on the server and broadcast 'event:loginRequired'.
             */
            $rootScope.$on('event:logoutRequest', function() {
                $http.get( $rootScope.appUrl + '/users/logout.json' )
                    .success(
                        function(data) {
                            httpHeaders.common['Authorization'] = null;
                        }
                    );

            });
        });

}());
