const koa = require('koa');
const bodyParser = require('koa-bodyparser');
// const router = require('koa-router')();
// const index = require('./routers/index');
// const user = require('./routers/user');
const router = require('./routers/index2');
const app = new koa();

app.use(bodyParser());


router(app);
// router.use('/',index.routes(), index.allowedMethods());
//router.use('/user',user.routes(), user.allowedMethods());
//app.use(router.routes(), router.allowedMethods());

app.listen('3000',()=>{
    console.log('server is running at http://127.0.0.1:3000');
});