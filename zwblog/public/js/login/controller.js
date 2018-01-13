var app = angular.module('login', []);
app.controller('loginCtr', ($scope,$http,$window,DataTools)=> {
  let account =	$scope.account = {};
  // 自动登录
  account.rememberMe = true;
  // 登录
  $scope.login = ()=>{
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
  	let blog = {email: account.email, password: account.password, isRemember: account.rememberMe};
    $http.post("/login/authenticate", blog).success(function(res) {
        if(res.status==0){
 		   $window.location.href = '/admin';
        }else{
        	$scope.errMsg = res.errorMessage;
        }
    });
  }
});