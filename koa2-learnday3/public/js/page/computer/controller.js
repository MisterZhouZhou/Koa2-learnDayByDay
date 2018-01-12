angular.module('Computer', [])
  .controller('ComputerController', ['$scope', '$location',
    function($scope, $location) {
       $scope.name = 'Computer';
    }
]);
