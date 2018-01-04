const UserService = require('../service/user');

exports.login = async (ctx, next)=>{
  let params = ctx.request.body
  let name = params.name
  let password = params.password
  let res = await app.service.register(name,password);
  console.log('======');
  ctx.body = '1';
  return;
  if(res.status == -1){
    await ctx.render("home/login", res.data)
  }else{
    ctx.state.title = "个人中心"
    await ctx.render("home/scuess", res.data)
  }
}

exports.register = async (ctx, next)=>{
  // 解构出 app 实例对象
  const { app } = ctx;
  let params = ctx.request.body
  let name = params.name
  let password = params.password
  let res = await app.service.register(name,password)
  if(res.status == -1){
    await ctx.render("home/login", res.data)
  }else{
    ctx.state.title = "个人中心"
    await ctx.render("home/login", res.data)
  }
}
