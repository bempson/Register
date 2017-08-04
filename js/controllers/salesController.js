( function() {
	
	var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    
    var as = angular.module('crafts.controllers');
   
    /*********************************************   
     * Sales Controller  
     *********************************************/        
    as.controller('SalesCtrl', function($scope, $rootScope, $http, $location) {
        var load = function() {

            console.log('... Sales Controller ... ');
            $http.get($rootScope.appUrl + '/api/Sales.json')

                    .success(function(data, status, headers, config) {
                        console.log(' ... We have all Sales Records ... ');
                        $scope.sales = data.sales;
                        angular.copy($scope.sales, $scope.copy);
                    });
        }

        load();
                
        $scope.newSale = function() {
            console.log('call Edit Sale');
            $location.path('/new-sale/');
        }
        
        $scope.newItem = function() {
            console.log(' ... Clicked newItem ... ');
            $location.path('/new-item' + $scope.sales[index]);
            
        }
        $scope.editSale = function(index) {
			console.log(' ... Edit Sale ... ');
			$location.path('/edit-Sale/' + $scope.sales[index].id);
		}

    });

    /***  Check Out ***/
    as.controller('CheckOutCtrl', function($scope, $rootScope, $http, $routeParams, $location) {
		
		$scope.sale = {};
		
		$scope.change = 0.00;
		$scope.payment = ["Cash", "Check", "Charge"];
		$scope.sale.cash = 0.00;
		
		var sale = function() {
            console.log(' ... Current Sale ... ');
            $http.get($rootScope.appUrl + '/api/Sales/getOne/' + $routeParams['id'] + '.json')
                    .success(function(data, status, headers, config) {
                        $scope.sale = data.sale;
                        $scope.sale.cash = 0.00;
                        $scope.sale.type = 'Blank';
                    });
        }

        sale();

        $scope.UpdatePayment = function() {
			console.log(' UPDATE PAYMENT ');
			
            if ( $scope.sale.type == "Cash") {
				console.log(' CASH SELECTED!! ');
			    $scope.sale.cash = 0.00;
			} else {
				$scope.sale.cash = $scope.sale.amount;
			}
			
        }
        
        $scope.MakeChange = function() {
			console.log(' ....Making Change....  ' );
            $scope.change = $scope.sale.cash - $scope.sale.amount;
            $scope.sale.change = $scope.change;
            $scope.sale.status = "Paid";
            
            delete $scope.sale.customer;
            delete $scope.sale.employee;
            delete $scope.sale.created;
            
            $scope.sale.modified = dateTime;
            
            var _data = $scope.sale;
            $http.put($rootScope.appUrl + '/api/Sales/edit/' + $routeParams['id'] + '.json', _data)
                 .success(function(data, status, headers, config) {});
            
        }
		
		$scope.printSale = function(index) {
			console.log(' ... Print Sale ... ');
			$location.path('/print-sale/' + $routeParams['id']);
		}
        
        
	});
	
	/***  Print Reciept ***/
	as.controller('PrintSaleCtrl', function($scope, $rootScope, $http, $routeParams, $location) {
	    var sale = function() {
            console.log(' ... Print Sale ... ');
            $http.get($rootScope.appUrl + '/api/Sales/getOne/' + $routeParams['id'] + '.json')
                    .success(function(data, status, headers, config) {
                        $scope.sale = data.sale;
                    });
        }

        sale();
        
        var transactions = function() {
		    $http.get($rootScope.appUrl + '/api/Transactions/SalesId/' + $routeParams['id'] + '.json')
                    .success(function(data, status, headers, config) {
                        $scope.transaction = data.transaction;
                    });
		}
		
		transactions();
       /* 
        console.log(' ... Set Status Paid ... ');
        var updatestatus = function() {
			
			$http.put($rootScope.appUrl + '/api/Sales/edit/' + $routeParams['id'] + '.json', _sale)
			    .success(function() {
					})
		}
		updatestatus();
        */

        $scope.printToCart = function(printSectionId) {

            var innerContents = document.getElementById(printSectionId).innerHTML;
            var popupWinindow = window.open('', 
               '_blank',
               'width=400,height=500,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
            popupWinindow.document.open();
            popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="css/app.css" /></head><body onload="window.print()">' + innerContents + '</html>');
            popupWinindow.document.close();
        }
        
	
	});
	 
    /***  New Sale ***/
    as.controller('NewSaleCtrl', function($scope, $rootScope, $http, $location) {

        $scope.sale = {};

        var employees = function() {
            $http.get($rootScope.appUrl + '/api/Employees.json')

                    .success(function(data, status, headers, config) {
                        console.log(' ... Grabbed all the employees ... ');
                        $scope.employees = data.employees;
                    });
        }
        employees();
        
        var customers = function() {
            $http.get($rootScope.appUrl + '/api/Customers.json')

                    .success(function(data, status, headers, config) {
                        console.log(' ... Grabbed all the customers ... ');
                        $scope.customers = data.customers;
                    });
        }
        customers();

        $scope.saveSale = function() {
            console.log(' ... call save Sale ... ');
            var _data = {};
            _data = $scope.sale;

            $http
	            .post($rootScope.appUrl + '/api/Sales/add/add.json' , _data)
	            .success(
	                function(data, status, headers, config) {
						$scope.sale = data.sale;
						$location.path('/edit-Sale/' + $scope.sale.id);
		            }
		        )
	            .error(
	                function(data, status, headers, config) { }
                );
        }
        
        $scope.newCustomer = function() {
			console.log(' ... Clicked New Customer ... ');
            $location.path('/new-customer/');
		}
		
    });
    

    /***  Edit Sale ***/    
    as.controller('editSaleCtrl', function($scope, $rootScope, $http, $routeParams, $location, $window) {
		var load = function() {
            console.log(' ... Current Sale ... ');
            $http.get($rootScope.appUrl + '/api/Sales/view/' + $routeParams['id'] + '.json')
                    .success(function(data, status, headers, config) {
                        $scope.sale = data.sale;
                    });
        }

        load();
        
        var trans = function() {

            console.log(' ... Fetch Transactions ... ');

            $http.get($rootScope.appUrl + '/api/Transactions/bySaleId/' + $routeParams['id'] + '.json')

                    .success(function(data, status, headers, config) {
                        console.log(' ... Got Transactions ... ');
                        $scope.transactions = data.transaction;
                    });
        }

        trans();    
        
        $scope.newItem = function() {
            console.log(' ... Clicked newItem ... ');
            $location.path('/new-item/' + $routeParams['id']);
        }
        
        $scope.editItem = function(index) {
            console.log(' ... You clicked Edit Item ... ');
            $location.path('/edit-item/' + $scope.transactions[index].id);
        }
        
        $scope.checkOut = function(index) {
            console.log(' ... You clicked Check Out ... ');
            $location.path('/check-out/' + $routeParams['id']);
        }
        
        $scope.addItem = function(index) {
            console.log(' ... Clicked newItem ... ');
            $location.path('/add-item/' + $routeParams['id']);
        }

        /*** Test Delete Item ***/
        $scope.deleteItem = function(index) {
			console.log(' ... Delete Item ... ');
			$location.path('/delete-item/' + $scope.transactions[index].id);
		}
		
        /*** Delete Item ***/
        $scope.olddeleteItem = function(index) {
            console.log(' ... Delete Item ... ');
            
            var todel = $scope.transactions[index];
            $http.get($rootScope.appUrl + '/api/Transactions/view/' + $routeParams['id'] + '.json')
                .success(function(data, status, headers, config) {
                    console.log(' ... Got Transaction To Delete ... ');
                    $window.$scope.transaction = data.transaction;
                });
                
        }
        
	});
	
    /*** 
     * New Item 
     ***/
    as.controller('NewItemCtrl', function($scope, $rootScope, $http, $routeParams, $location) {
		
		console.log('... Adding A New Item ... ');
		
		$scope.price = 0;
        tax = .06;
        $scope.transaction = {};

        $scope.transaction.sale_id = $routeParams['id'];
        
        /*** Get Sales ***/
        $http.get($rootScope.appUrl + '/api/Sales/view/' + $routeParams['id'] + '.json')
			        .success(function(data, status, headers, config) {
						console.log(' ... Got Sale ... ');
                         $scope.sales = data.sale;
		});
		
		var products = function() {
            $http.get($rootScope.appUrl + '/api/Products.json')
                .success( function(data, status, headers, config) {
					$scope.products = data.products;
				});
		}
		products();
		
        /***  Update Price  ***/
        $scope.UpdatePrice = function() {
			console.log(' ....Product ID Changed....  ' );
			$http.get($rootScope.appUrl + '/api/Products/view/' + $scope.transaction.product_id + '.json')
			    .success(function(data, status, headers, config) {
			         console.log(' ... Grabbed Product Information ... ');
                     $scope.product = data.product;
                 });     
		}

        /***  Update Quanity  ****/
        $scope.UpdateQuantity = function() {
			
			console.log('  ....Update Quantity....  ');
			
			$scope.transaction.price = $scope.product.unit_price;
			$scope.transaction.subtotal = $scope.product.unit_price * $scope.transaction.quantity;
			$scope.transaction.tax = 0.00;
			$scope.transaction.amount =  $scope.transaction.subtotal + $scope.transaction.tax;
			
			console.log('  ....Update Complete....  ');
		}	
		
		$scope.UpdateTax = function() {
			if ($scope.transaction.taxable == true) {
				$scope.transaction.tax = tax * $scope.transaction.subtotal;
				$scope.transaction.amount =  $scope.transaction.subtotal + $scope.transaction.tax;
			} else {		
			    $scope.transaction.amount =  $scope.transaction.amount - $scope.transaction.tax;
				$scope.transaction.tax = 0.00;
				$scope.transaction.taxable = false;
			}
		}
		
		$scope.updateTransaction = function() {
            console.log('call updateTransaction');
            var _data = {};
                
            if ($scope.transaction.taxable == true) {
			    $scope.transaction.taxable = '1';
			} else {
				$scope.transaction.taxable = '0';
			}
            
            
            _data = $scope.transaction;
                			    
            $http.post($rootScope.appUrl + '/api/Transactions/add/add.json', _data)
                .success(function(data, status, headers, config) {
						
					var _data = {};
					var _sale = {};
						
					$scope.transaction = data.transaction;
					$scope.product.id = $scope.transaction.product_id;
					$scope.product.units_in_stock = $scope.product.units_in_stock - $scope.transaction.quantity;
			
					delete $scope.product.created;
					delete $scope.product.modified;
                        
					_data = $scope.product;
						
					$http.put($rootScope.appUrl + '/api/Products/edit/' + $scope.product.id + '.json', _data)
                         .success(function(data, status, headers, config) {})
                         .error(function(data, status, headers, config) {});
                         
                    $scope.sales.items    = $scope.sales.items + $scope.transaction.quantity;
                    $scope.sales.subtotal = $scope.sales.subtotal + $scope.transaction.subtotal;
                    $scope.sales.tax      = $scope.sales.tax + $scope.transaction.tax;
                    $scope.sales.amount   = $scope.sales.amount + $scope.transaction.amount;
                    
                    delete $scope.sales.created;
					delete $scope.sales.modified;
                        
					_sale = $scope.sales;
						
                    $http.put($rootScope.appUrl + '/api/Sales/edit/' + $routeParams['id'] + '.json', _sale)
                        .success(function(data, status, headers, config) {
							$location.path('/edit-Sale/' + $routeParams['id']);
						});
                        
						
                })
                .error(function(data, status, headers, config) {});
            }
		/*  */
		
	});

    /****** Edit Item ******/
    as.controller('EditItemCtrl', function($scope, $rootScope, $http, $routeParams, $location) {

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
     
/*************************************************************/
    /****** Delete Item ******/
    as.controller('deleteItemCtrl', function($scope, $rootScope, $http, $routeParams, $location) {
		
		console.log(' ... Delete Item from Sale ...');
        $scope.transaction = {};
        $scope.product = {};
        $scope.sale = {};
        
        var load = function() {
            
            $http.get($rootScope.appUrl + '/api/Transactions/view/' + $routeParams['id'] + '.json')
                    .success(function(data, status, headers, config) {
                        $scope.transaction = data.transaction;
                        $scope.sale = data.transaction.sale;
                        $scope.product = data.transaction.product;
                    });
        }
        load();
        
        $scope.deleteTransaction = function() {
            console.log('call deleteTransaction');
            
            console.log(' ... Sale Update ... ');
            $scope.sale.items = parseInt($scope.sale.items) - parseInt($scope.transaction.quantity);
		    $scope.sale.subtotal = $scope.sale.subtotal - $scope.transaction.subtotal;
		    $scope.sale.tax = $scope.sale.tax - $scope.transaction.tax;
		    $scope.sale.amount = $scope.sale.amount - $scope.transaction.amount;
		    $scope.sale.modified = dateTime;
		    delete $scope.sale.created;
		    
		    var _sale = $scope.sale;
		    //var updatesale = function() {
							
		    $http.put($rootScope.appUrl + '/api/Sales/edit/' + $scope.sale.id + '.json', _sale)
		        .success(function(data, status, headers, config) { 
			    console.log(' ... Sale Updated ... ');
					
			    console.log(' ... Product Update ... ');
			    var _data = {};
		            $scope.product.units_in_stock = $scope.product.units_in_stock + $scope.transaction.quantity;
		            $scope.product.modified = dateTime;
		            delete $scope.product.created;
		    
		            _data = $scope.product;
		    
		            $http.put($rootScope.appUrl + '/api/Products/edit/' + $scope.product.id + '.json', _data)
		                .success(function() {
					        console.log(' ... Product Update Success ... ');
					        
					        console.log(' ... Delete Transaction ... ');
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
                               
                           $http
                               .delete($rootScope.appUrl + '/api/Transactions/delete/' + $scope.transaction.id + '.json')
                               .success(function(data, status, headers, config) {
                                   $location.path('/edit-Sale/' + $scope.sale.id);
                                })
                               .error(function(data, status, headers, config) { 
								   console.log(' ... Delete Transaction Failed! ... '); 
								});
					        
				          })
				         .error(function(data, status, headers, config) { 
							 console.log(' ... Update Product Failed! ... ');
						  });
				 })				
				.error(function(data, status, headers, config) {
					console.log(' ... Update Sale Failed! ... ');
				 });
		    };        
        //}
    });
/*************************************************************/
    /*** 
     * Manually Add Item 
     ***/
    as.controller('AddItemCtrl', function($scope, $rootScope, $http, $routeParams, $location) {
		
		console.log('... Adding A New Item ... ');
		
		$scope.price = 0;
        tax = .06;
        $scope.transaction = {};
        $scope.product = {};
                    
        $scope.transaction.sale_id = $routeParams['id'];
        $scope.transaction.product_id = 0;

        /*** Get Categories ***/
        var getcat = function() {
            $http.get($rootScope.appUrl + '/api/Categories.json')
                    .success(function(data, status, headers, config) {
                        $scope.categories = data.categories;                      
                    });
        }
        getcat();

        /*** Get Departments ***/
        var getdep = function() {
            $http.get($rootScope.appUrl + '/api/Departments.json')
                    .success(function(data, status, headers, config) {
                        $scope.departments = data.departments;                      
                    });
        }
        getdep();
                
        /*** Get Sales ***/
        $http.get($rootScope.appUrl + '/api/Sales/edit/' + $routeParams['id'] + '.json')
			        .success(function(data, status, headers, config) {
						console.log(' ... Got Sale ... ');
                         $scope.sales = data.sale;
		});
		
        /***  Update Quanity  ****/
        $scope.UpdateQuantity = function() {
			
			console.log('  ....Update Quantity....  ');
			
			$scope.transaction.subtotal = $scope.transaction.price * $scope.transaction.quantity;
			$scope.transaction.tax = 0.00;
			$scope.transaction.amount =  $scope.transaction.subtotal + $scope.transaction.tax;
			
			console.log('  ....Update Complete....  ');
		}	
		
		$scope.UpdateTax = function() {
			if ($scope.transaction.taxable == true) {
				$scope.transaction.tax = tax * $scope.transaction.subtotal;
				$scope.transaction.amount =  $scope.transaction.subtotal + $scope.transaction.tax;
			} else {		
			    $scope.transaction.amount =  $scope.transaction.amount - $scope.transaction.tax;
				$scope.transaction.tax = 0.00;
				$scope.transaction.taxable = false;
			}
		}

		$scope.updateTransaction = function() {
            console.log('call updateTransaction');

		    $scope.product.description = $scope.product.name;
		    $scope.product.unit_price = $scope.transaction.price;
            var _prod = $scope.product;

            $http.post($rootScope.appUrl + '/api/Products/add/add.json' , _prod)
	            .success(
	                function(data, status, headers, config) {
						$scope.product = data.product;
						
						if ($scope.transaction.taxable == true) {
			                $scope.transaction.taxable = '1';
			            } else {
				            $scope.transaction.taxable = '0';
			            }
			            
			            $scope.transaction.product_id = $scope.product.id;
			            var _data = $scope.transaction;
			            
			            $http.post($rootScope.appUrl + '/api/Transactions/add/add.json', _data)
                             .success(function(data, status, headers, config) {
			                     var _sale = {};
						
					             $scope.transaction = data.transaction;
                         
                                 $scope.sales.items    = $scope.sales.items + $scope.transaction.quantity;
                                 $scope.sales.subtotal = $scope.sales.subtotal + $scope.transaction.subtotal;
                                 $scope.sales.tax      = $scope.sales.tax + $scope.transaction.tax;
                                 $scope.sales.amount   = $scope.sales.amount + $scope.transaction.amount;
                    
                                 delete $scope.sales.created;
					             delete $scope.sales.modified;
                        
					             _sale = $scope.sales;
					             	
                                 $http.put($rootScope.appUrl + '/api/Sales/edit/' + $routeParams['id'] + '.json', _sale)
                                      .success(function(data, status, headers, config) {
							              $location.path('/edit-Sale/' + $routeParams['id']);
						              })
						              .error( function(data, status, headers, config) {} );
		                     })
	                        .error( function(data, status, headers, config) {} );
    		    })
                .error(function(data, status, headers, config) { "Failed!!!  "});
            }
		/*  */
		
	});
	
}());
