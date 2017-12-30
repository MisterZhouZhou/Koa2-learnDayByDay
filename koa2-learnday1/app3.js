const koa = require('koa');
const router = require('koa-router')();
const app = new koa();

router.get('/',async (ctx, next)=>{
    ctx.body = 'index page';
});

router.get('/home',async (ctx, next)=>{
    ctx.body = 'home page';
});

router.get('/info',async (ctx, next)=>{
    ctx.body = 'info page';
});

// app.use(router.routes());
app.use(router.routes(), router.allowedMethods());

app.listen('3000',()=>{
    console.log('server is running at http://127.0.0.1:3000');
});