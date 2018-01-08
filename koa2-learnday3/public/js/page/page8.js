var myApp1 = angular.module('myApp1', []);
myApp1.controller('myCtrl1', ($scope, $http)=> {
    $http.get('/customers').then((result)=>{
        $scope.names = result.data.records;
    })
 });

var myApp2 = angular.module('myApp2', []);
myApp2.controller('myCtrl2', ['$scope','$http', ($scope,$http)=>{
    $http.get('/customers').then((result)=>{
        $scope.names = result.data.records;
    })

}]);

var myApp3 = angular.module('myApp3', []);
myApp3.controller('myCtrl3', ['$scope','$http', ($scope,$http)=>{
    $http.get('/customers').then((result)=>{
        $scope.names = result.data.records;
    })

}]);

var myApp4 = angular.module('myApp4', []);
myApp4.controller('myCtrl4', ['$scope','$http', ($scope,$http)=>{
    $http.get('/customers').then((result)=>{
        $scope.names = result.data.records;
    })

}]);


var myApp5 = angular.module('myApp5', []);
myApp5.controller('myCtrl5', ['$scope','$http', ($scope,$http)=>{
    $http.get('/customers').then((result)=>{
        $scope.names = result.data.records;
    })
}]);


var myApp6 = angular.module('myApp6', []);
myApp6.controller('myCtrl6', ['$scope','$http', ($scope,$http)=>{
    $http.get('/customers').then((result)=>{
        $scope.names = result.data.records;
    })
}]);



angular.module('myApp', ['myApp1','myApp2','myApp3','myApp4','myApp5','myApp6']);