var myApp1 = angular.module('myApp1', []);
myApp1.controller('myCtrl1', ($scope)=> {
    
});
var myApp2 = angular.module('myApp2', []);
myApp2.controller('myCtrl2', ['$scope', ($scope)=>{
    
}]);
var myApp3 = angular.module('myApp3', []);
myApp2.controller('myCtrl3', ['$scope', ($scope)=>{
    
}]);
angular.module('myApp', ['myApp1','myApp2','myApp3']);