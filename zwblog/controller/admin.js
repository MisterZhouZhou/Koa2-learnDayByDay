'use strict';
var dateFormat = require('dateformat');

// var ctrl = {};
// exports = module.exports = ctrl;

var User = Database.models.user;

exports.index = async(ctx,next)=> {
  // 判断是否登录过
  if (ctx.session.user) {
    await ctx.render('admin/index');
  }else {
    ctx.redirect('/admin/login');
  }
}

exports.login = async(ctx,next)=> {
  // 判断是否登录过
  if (ctx.session.user) {
    ctx.redirect('/admin');
  }else {
    await ctx.render('auth/login',{
      config: Conf.template,
      title: '登录',
    });
  }
}

exports.register = async(ctx,next)=> {
  await ctx.render('auth/register',{
        config: Conf.template,
        title: '注册',
    });
}

// 登录授权
// exports.auth = async(ctx,next)=> {
//   const {email, password} = ctx.request.body;
//   if(email && password){
//     let user = await User.getAccountByEmailAndPwd(email, password);
//     if(user&&user.length>0){
//        ctx.session.user = email;
//        ctx.redirect('/admin');
//        return;
//     }
//   }
//   ctx.session.user = undefined;
//   await ctx.render('auth/login',{
//         config: Conf.template,
//         title: '登录'
//     });
//   // ctx.redirect('/admin/login');
//   // 登录失败，重定向到登录页面
//   // ctx.redirect('/admin/login');
// }

// 用户登录api
exports.auth = async(ctx,next)=> {
  const {email, password, isRemember} = ctx.request.body;
  if(email && password){
    let user = await User.getAccountByEmailAndPwd(email, password);
    if(user&&user.length>0){
       if(isRemember){
          // 这里处理自动登录
       }
       ctx.session.user = email;
       ctx.body = {
         status: 0
       };
       return;
    }
  }
  ctx.body = {
    status: -1,
    errorMessage: '账号或密码不对！'
  }
}

// 注册账号
exports.invite = async(ctx,next)=> {
  const {email, password} = ctx.request.body;
  let users = await User.getAccounts();
  let hasUser = false;
  for (var i = 0; i < users.length; i++) {
    if(users[i].email == email){
      hasUser = true;
      break;
    }
  }
  if(!hasUser){
    if(email && password){
      var user = new User();
      user.email = email;
      user.role  = 'customer';
      user.password = password;
      user.regist_time = dateFormat((new Date()).getTime(), "yyyy-mm-dd hh:MM:ss");
      user.save();
      ctx.body = {
         status: 0
       };
       return;
      // ctx.redirect('/admin/login');
    }
  }else{
     // 注册失败/已有该用户
     ctx.body = {
        status: -1,
        errorMessage: '该账号已被注册'
      }
      return;
     // ctx.redirect('/admin/register',{title: '注册'});
  }
  ctx.body = {
      status: -1,
      errorMessage: '账号或密码不对！'
    }
}


// 注销登录
exports.loginout = async(ctx,next)=> {
  ctx.session.user = undefined;
  ctx.body = {
      status: 0
  }
}

