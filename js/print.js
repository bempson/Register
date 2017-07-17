var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope) {
      
    $scope.printToCart = function(printSectionId) {
        var innerContents = document.getElementById(printSectionId).innerHTML;
        var popupWinindow = window.open('', 
               '_blank',
               'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
        popupWinindow.document.close();
    }

});
