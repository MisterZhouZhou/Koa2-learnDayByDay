const koa = require('koa');

const app = new koa();
const router = require('./routers');

const middleware = require('./middleware');

middleware(app);

// 设置路由
router(app);

// 设置监听
app.listen(3000,()=>{
  console.log('server is running at http://localhost:3000');
});
