const koa = require('koa');
const path = require('path');
const bodyParser = require('koa-bodyparser');
// 引入 nunjucks
const nunjucks = require('koa-nunjucks-2');
// 引入 koa-static
const staticFiles = require('koa-static');


const app = new koa();
const router = require('./routers');

// 指定 public目录为静态资源目录，用来存放 js css images 等
app.use(staticFiles(path.resolve(__dirname,'./public')));

app.use(nunjucks({
  ext: 'html',
  path: path.join(__dirname, 'views'),
  nunjucksConfig: {
    trimBlocks: true  // 允许转译
  }
}));

// 使用插件
app.use(bodyParser());

// 设置路由
router(app);

// 设置监听
app.listen(3000,()=>{
  console.log('server is running at http://localhost:3000');
});
