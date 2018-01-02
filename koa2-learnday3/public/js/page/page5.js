var myApp1 = angular.module('myApp1', []);
myApp1.controller('myCtrl1', ($scope,$rootScope,$location,$hexafy)=> {
    // $scope.name = 'Runoob';
    $scope.locationUrl = $location.absUrl();
    $rootScope.name = 'Runoob';
    $scope.sayHello = ()=>{
    	$scope.greeting = 'Hello' + $scope.name + '!';
    }
    $scope.hex = $hexafy.myFunc(255);
});
// 自定义服务,向外提供方法, service不能使用箭头函数
myApp1.service('$hexafy', function() {
    this.myFunc =  function(x) {
        return x.toString(16);
    }
});

// 自定义过滤方法，过滤，可以使用箭头函数
myApp1.filter('sayHi', ['$hexafy',($hexafy)=> { //可以注入依赖
    return (text)=> {
        return $hexafy.myFunc(text);
    }
}]);





var myApp2 = angular.module('myApp2', []);
myApp2.controller('myCtrl2', ['$scope','$rootScope','$timeout', ($scope,$rootScope,$timeout)=>{
    // $scope.lastName= 'zw'
     $timeout(function () {
        $scope.myHeader = "How are you today?";
    }, 2000);
    $rootScope.lastName = 'zw';
}]);

// 自定义过滤方法
myApp2.filter('reverse', ()=> { //可以注入依赖
    return (text)=> {
        return text.split("").reverse().join("");
    }
});


// 多个app下无法使用自定义服务
var myApp3 = angular.module('myApp3', []);
myApp3.controller('myCtrl3', ['$scope','$http','$interval', ($scope,$http,$interval)=>{
    $http.get('http://127.0.0.1:3000/welcome').then((response)=>{
    	$scope.htmlData = response.data;
    });
    $interval(()=>{
    	$scope.theTime = new Date().toLocaleTimeString();
    },1000);
    // $scope.sayhi =$sayHi.myFunc('zw');
}]);
// 自定义服务
// myApp3.service('$sayHi', function() {
//     this.myFunc =  function(x) {
//         return 'hi '+x;
//     }
// });



angular.module('myApp', ['myApp1','myApp2','myApp3']);