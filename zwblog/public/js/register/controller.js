var app = angular.module('register', []);
app.controller('registerCtr', ($scope,$http,$window,DataTools)=> {
  let account = $scope.account = {};
  $scope.register = ()=>{
    if(!account.email){
      $scope.errMsg = '邮箱是必须的';
      return;
    }else{
      // 监测邮箱有效性
      if(!DataTools.isEmail(account.email)){
      $scope.errMsg = '请输入正确的邮箱';
        return;
      }
    }
    if(!account.password){
      $scope.errMsg = '密码是必须的';
      return;
    }
    if(!account.repassword || account.password != account.repassword){
      $scope.errMsg = '两次输入的密码不一致';
      return;
    }
    let blog = {email: account.email, password: account.password, isLogin: account.rememberMe};
    $http.post("/register/invite", blog).success(function(res) {
        if(res.status==0){
          $window.location.href = '/admin/login';
        }else{
          $scope.errMsg = res.errorMessage;
        }
    });
  }
});