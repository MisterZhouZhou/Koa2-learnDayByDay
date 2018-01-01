var myApp1 = angular.module('myApp1', []);
myApp1.controller('myCtrl1', ($scope,$rootScope)=> {
    $scope.name = 'Runoob';
    $scope.sayHello = ()=>{
    	$scope.greeting = 'Hello' + $scope.name + '!';
    }
});
var myApp2 = angular.module('myApp2', []);
myApp2.controller('myCtrl2', ['$scope', ($scope)=>{
    
}]);

angular.module('myApp', ['myApp1','myApp2']);