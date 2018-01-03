var app = angular.module('myApp',[]);
app.controller('siteCtrl', ($scope,$http)=>{
  $http.get('/sites')
  .then((response)=>{
     $scope.names = response.data.sites;
  });
});