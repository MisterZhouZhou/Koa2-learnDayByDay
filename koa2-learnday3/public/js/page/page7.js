var myApp1 = angular.module('myApp1', []);
myApp1.controller('myCtrl1', ($scope)=> {
    $scope.names = ["Google","Runoob","Taobao"];
    $scope.sites = [
        {site : "Google", url : "http://www.google.com"},
        {site : "Runoob", url : "http://www.runoob.com"},
        {site : "Taobao", url : "http://www.taobao.com"}
    ];
    $scope.sites2 = {
        site01 : "Google",
        site02 : "Runoob",
        site03 : "Taobao"
    };
    $scope.cars = {
        car01 : {brand : "Ford", model : "Mustang", color : "red"},
        car02 : {brand : "Fiat", model : "500", color : "white"},
        car03 : {brand : "Volvo", model : "XC90", color : "black"}
    }
});





// var myApp2 = angular.module('myApp2', []);
// myApp2.controller('myCtrl2', ['$scope','$rootScope','$timeout', ($scope,$rootScope,$timeout)=>{
//     // $scope.lastName= 'zw'
//      $timeout(function () {
//         $scope.myHeader = "How are you today?";
//     }, 2000);
//     $rootScope.lastName = 'zw';
// }]);



angular.module('myApp', ['myApp1']);