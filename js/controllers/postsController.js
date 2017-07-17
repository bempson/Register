(function() {
	
	var as = angular.module('crafts.controllers');
	
	/*********************************************   
     * Post Controller Stuff 
     *********************************************/
          
     as.controller('PostListCtrl', function($scope, $rootScope, $http, $location) {
        var load = function() {
            console.log(' ... Post Controller ... ');
            $http.get($rootScope.appUrl + '/api/posts.json')
                    .success(function(data, status, headers, config) {
                        $scope.posts = data.posts;
                        angular.copy($scope.posts, $scope.copy);
                    });
        }

        load();

        $scope.addPost = function() {
            console.log('call addPost');
            $location.path("/new-post");
        }

        $scope.editPost = function(index) {
            console.log('call editPost');
            $location.path('/edit-post/' + $scope.posts[index].id);
        }

        $scope.delPost = function(index) {
            console.log('call delPost');
            var todel = $scope.posts[index];
            $http
                    .delete($rootScope.appUrl + '/api/posts/delete/' + todel.id + '.json')
                    .success(function(data, status, headers, config) {
                        load();
                    }).error(function(data, status, headers, config) {
            });
        }

    });

    as.controller('NewPostCtrl', function($scope, $rootScope, $http, $location) {

        $scope.post = {};

        $scope.savePost = function() {
            console.log('call savePost');
            var _data = {};
            _data = $scope.post;

            $http
	            .post($rootScope.appUrl + '/api/Posts/add/add.json' , _data)
	            .success(
	                function(data, status, headers, config) {
		                $location.path('/posts');
		            }
		        )
	            .error(
	                function(data, status, headers, config) { }
                );
        }
    });

    as.controller('EditPostCtrl', function($scope, $rootScope, $http, $routeParams, $location) {

        var load = function() {
            console.log('call load()...');
            $http.get($rootScope.appUrl + '/api/Posts/view/' + $routeParams['id'] + '.json')
                    .success(function(data, status, headers, config) {
                        $scope.post = data.post;
                        angular.copy($scope.post, $scope.copy);
                    });
        }

        load();

        $scope.post = {};

        $scope.updatePost = function() {
            console.log('call updatePost');
        
            var _data = {};
                delete $scope.post.created;
                $scope.post.modified = dateTime;
                _data = $scope.post;
                
                console.log(_data);            
                $http
                    .put($rootScope.appUrl + '/api/Posts/edit/' + $scope.post.id + '.json', _data)
                    .success(function(data, status, headers, config) {
                        $location.path('/posts');
                    }).error(function(data, status, headers, config) {
            });
        }
    });
    
}());
