 // angular.module('routingDemoApp',['ngRoute'])
 //            .config(['$routeProvider', ($routeProvider) =>{
 //                $routeProvider
 //                .when('/',{template:'这是首页页面'})
 //                .when('/computers',{template:'这是电脑分类页面'})
 //                .when('/printers',{template:'这是打印机页面'})
 //                .otherwise({redirectTo:'/'});
 //            }]);


angular.module('Home', []);
angular.module('Computer', []);
angular.module('routingDemoApp', ['Home','Computer','ngRoute'])
.config(function ($routeProvider) {
     $routeProvider
    .when('/',{templateUrl:'js/page/home/home.html', controller: 'HomeController'})
    .when('/computers',{templateUrl: 'js/page/computer/computers.html', controller: 'ComputerController'})
    .when('/printers',{template:'这是打印机页面'})
    .otherwise({redirectTo:'/'});
});
