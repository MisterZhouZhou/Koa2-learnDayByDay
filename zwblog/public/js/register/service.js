angular.module('register')
    .factory('DataTools', ['$http',
        function($http) {
            var service = {};
            service.isEmail = function(email){
              var regex = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
              return regex.test(email);
            }
            return service;
        }
    ]);