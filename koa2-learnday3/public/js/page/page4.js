var myApp1 = angular.module('myApp1', []);
myApp1.controller('myCtrl1', ($scope)=> {
    
});
var myApp2 = angular.module('myApp2', []);
myApp2.controller('myCtrl2', ['$scope', ($scope)=>{
    
}]);
var myApp3 = angular.module('myApp3', []);
myApp3.controller('myCtrl3', ['$scope', ($scope)=>{
    
}]);
var myApp4 = angular.module('myApp4', []);
myApp4.controller('myCtrl4', ['$scope', ($scope)=>{
    
}]);
var myApp5 = angular.module('myApp5', []);
myApp5.controller('myCtrl5', ['$scope', ($scope)=>{
    
}]);
var myApp6 = angular.module('myApp6', []);
myApp6.controller('myCtrl6', ['$scope', ($scope)=>{
    
}]);
var myApp7 = angular.module('myApp7', []);
myApp7.controller('myCtrl7', ['$scope', ($scope)=>{
    
}]);
var myApp8 = angular.module('myApp8', []);
myApp8.controller('myCtrl8', ['$scope', ($scope)=>{
    
}]);



angular.module('myApp', ['myApp1','myApp2','myApp3','myApp4','myApp5','myApp6','myApp7','myApp8']);