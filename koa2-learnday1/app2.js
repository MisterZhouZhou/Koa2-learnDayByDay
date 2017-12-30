const koa = require('koa');
const app = new koa();

app.use(async (ctx,next)=>{
    if(ctx.request.path === '/'){
        ctx.body = 'index page';
    }else{
        await next();
    }
});

app.use(async (ctx,next)=>{
    if(ctx.request.path === '/home'){
        ctx.body = 'home page';
    }else{
        await next();
    }
});

app.use(async (ctx,next)=>{
    if(ctx.request.path === '/info'){
        ctx.body = 'info page';
    }else{
        ctx.body = '404 page';
    }
});

app.listen('3000',()=>{
    console.log('server is running at http://127.0.0.1:3000')
});