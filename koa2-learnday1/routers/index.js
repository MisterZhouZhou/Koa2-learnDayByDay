const router = require('koa-router')();

router.get('/',async (ctx, next)=>{
    ctx.body = 'index page';
});

router.get('/home',async (ctx, next)=>{
    console.log(ctx.request.query)
    console.log(ctx.request.querystring)
    ctx.body = 'home page';
});

router.get('/info',async (ctx, next)=>{
    ctx.body = 'info page';
});

router.get('/info/:name',async (ctx, next)=>{
    let name = ctx.params.name || ctx.query.name ||  ctx.request.body.name;
    console.log(JSON.stringify(ctx.params));
    console.log(JSON.stringify(ctx.request.query));
    console.log(JSON.stringify(ctx.query));
    console.log(JSON.stringify(ctx.request.body));
    ctx.body = `hello ${name}`;
});

router.get('/user',async (ctx,next)=>{
    ctx.body = 
    `
    <form action="/user/register" method="post">
        <input name="name" type="text" placeholder="请输入用户名：zw"/> 
        <br/>
        <input name="password" type="text" placeholder="请输入密码：123456"/>
        <br/> 
        <button>提交</button>
      </form>
    `
});

router.post('/user/register', async (ctx, next)=>{
    console.log(JSON.stringify(ctx.query));
    console.log(JSON.stringify(ctx.query));
    // let {name, password} = ctx.query;
    ctx.body= 'index';
});

module.exports = router;