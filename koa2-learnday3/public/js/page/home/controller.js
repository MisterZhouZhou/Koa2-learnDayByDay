angular.module('Home', [])
  .controller('HomeController', ['$scope', '$location',
    function($scope, $location) {
       $scope.name = 'zw';
       alert('d');
    }
]);
