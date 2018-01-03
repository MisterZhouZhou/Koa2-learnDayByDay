const path = require('path');
const bodyParser = require('koa-bodyparser');
const nunjucks = require('koa-nunjucks-2');
const staticFiles = require('koa-static');

const miSend = require('./mi-send');
// 引入日志中间件
const miLog = require('./mi-log');

module.exports = (app) => {

  // 注册中间件
  app.use(miLog())

  // 指定 public目录为静态资源目录，用来存放 js css images 等
  app.use(staticFiles(path.resolve(__dirname,'../public')));

  app.use(nunjucks({
    ext: 'html',
    path: path.join(__dirname, '../views'),
    nunjucksConfig: {
      trimBlocks: true  // 允许转译
    }
  }));
  // 使用插件
  app.use(bodyParser());

  app.use(miSend());
}
