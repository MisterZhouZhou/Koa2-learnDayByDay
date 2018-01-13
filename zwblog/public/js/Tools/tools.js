exports.isEmail = function(email){
          var regex = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
          return regex.test(email);
      }