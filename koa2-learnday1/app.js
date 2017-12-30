const koa = require('koa');
const app = new koa();

// 中间件
// app.use(async (ctx, next)=>{
//     // next 参数的作用是将处理的控制权转交给下一个中间件
//     let startTime = new Date().getTime();
//     await next()
//     let endTime = new Date().getTime();
//     console.log(ctx.request.url+'=='+ctx.url);
//     ctx.response.type = 'text/html';
//     ctx.response.body = '<h1>Hello World</h1>';
//     // ctx.body =  '<h1>Hello World</h1>'; 和ctx.response.body效果一致
//   });

app.use(async (ctx, next)=>{
    // next 参数的作用是将处理的控制权转交给下一个中间件
    let startTime = new Date().getTime();
    await next()
    let endTime = new Date().getTime();
    ctx.response.body = `请求地址: ${ctx.path}，响应时间：${endTime - startTime}ms`;
  });

  app.use(async (ctx, next) => {
    console.log('中间件1 start')
    await next();
    console.log('中间件1 end')
  });

  app.use(async (ctx, next) => {
    console.log('中间件2 start')
    await next();
    console.log('中间件2 end')
  });
  
  app.use(async (ctx, next) => {
    console.log('中间件3 start')
    await next();
    console.log('中间件3 end')
  });
  
  app.use(async (ctx, next) => {
    console.log('中间件4 start')
    await next();
    console.log('中间件4 end')
  });

app.listen(3000,()=>{
    console.log('server is running at http://127.0.0.1:3000');
});