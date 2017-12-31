const Koa = require('koa');
const path = require('path');
const views = require('koa-views');
// 引入 koa-static
const staticFiles = require('koa-static')
const app = new Koa();

const router = require('./routers/index');

app.use(views(__dirname + '/views', {
  extension: 'jade'
}));

// 指定 public目录为静态资源目录，用来存放 js css images 等
app.use(staticFiles(path.resolve(__dirname, "./public")))


app.use(router.routes(), router.allowedMethods());

app.listen(3000, ()=>{
  console.log('server is starting at:127.0.0.1:3000')
});