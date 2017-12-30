const Koa = require('koa');
const views = require('koa-views');
const app = new Koa();
const router = require('./router');

app.use(views(__dirname + '/views', {
  extension: 'jade'
}))

app.use(router.routes(), router.allowedMethods());

app.listen(3000, ()=>{
  console.log('server is starting at port 3000')
})