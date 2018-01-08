var myApp1 = angular.module('myApp1', []);
myApp1.controller('myCtrl1', ($scope, $http)=> {

 });

var myApp2 = angular.module('myApp2', []);
myApp2.controller('myCtrl2', ['$scope','$http', ($scope,$http)=>{
    $scope.firstName = "John",
    $scope.lastName = "Doe"
    $scope.myVar = false;
    $scope.toggle = function() {
        $scope.myVar = !$scope.myVar;
    };
}]);




angular.module('myApp', ['myApp1','myApp2']);