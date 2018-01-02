/* home */

exports.index = async(ctx, next) => {
    await ctx.render("home/index", {title: "iKcamp欢迎您"})
  }

exports.home = async (ctx, next)=>{
  // ctx.body =  '<h1>HOME page</h1>';
  ctx.send({
	  status: 'success',
	  data: 'hello ikcmap'
  });
}


exports.homeParams = async (ctx, next)=>{
  ctx.body = '<h1>HOME page /:id/:name</h1>'
}


exports.login = async (ctx, next)=>{
  await ctx.render('home/login', {
    btnName: 'GoGoGo'
  });
}

