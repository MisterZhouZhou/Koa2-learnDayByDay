const UserService = require('../../service/user');

exports.login = async (ctx, next)=>{
  let params = ctx.request.body
  let name = params.name
  let password = params.password
  let res = await UserService.register(name,password)
  if(res.status == "-1"){
    await ctx.render("home/login", res.data)
  }else{
    ctx.state.title = "个人中心"
    await ctx.render("home/scuess", res.data)
  }
}

exports.register = async (ctx, next)=>{
  let params = ctx.request.body
  let name = params.name
  let password = params.password
  let res = await UserService.register(name,password)
  if(res.status == "-1"){
    await ctx.render("home/login", res.data)
  }else{
    ctx.state.title = "个人中心"
    await ctx.render("home/scuess", res.data)
  }
}
