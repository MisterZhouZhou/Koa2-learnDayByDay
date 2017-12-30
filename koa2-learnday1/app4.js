const koa = require('koa');
const router = require('./routers');
const app = new koa();

// app.use(router.routes());
// app.use('/',router.routes(), router.allowedMethods());
app.use(router.routes(), router.allowedMethods());


app.listen('3000',()=>{
    console.log('server is running at http://127.0.0.1:3000');
});