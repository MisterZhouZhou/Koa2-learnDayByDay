var app = angular.module('myApp',[]);
app.controller('siteCtrl', ($scope,$http)=>{
  $http.get('http://127.0.0.1:3000/sites')
  .then((response)=>{
     $scope.names = response.data.sites;
  });
});