const path = require('path');
const bodyParser = require('koa-bodyparser');
const nunjucks = require('koa-nunjucks-2');
const staticFiles = require('koa-static');
const ip = require('ip');

const miSend = require('./mi-send');
// 引入日志中间件
const miLog = require('./mi-log');
// 引入请求错误中间件
const miHttpError = require('./mi-http-error');
// 引入规则中件间
const miRule = require('./mi-rule');


module.exports = (app) => {
   /**
   * 在接口的开头调用
   * 指定 controller 文件夹下的 js 文件，挂载在 app.controller 属性
   * 指定 service 文件夹下的 js 文件，挂载在 app.service 属性
   */ 
  miRule({
    app,
    rules: [
      {
        path: path.join(__dirname, '../controllers'),
        name: 'controller'
      },
      {
        path: path.join(__dirname, '../service'),
        name: 'service'
      }
    ]
  });

  // 应用请求错误中间件
  app.use(miHttpError({
    errorPageFolder: path.resolve(__dirname, '../errorPage')
  }));
  // 注册中间件
  app.use(miLog({
    env: app.env,  // koa 提供的环境变量
    projectName: 'koa2-learnday4',
    appLogLevel: 'debug',
    dir: 'logs',
    serverIp: ip.address()
  }));

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

  // 增加错误的监听处理
  app.on("error", (err, ctx) => {
    if (ctx && !ctx.headerSent && ctx.status < 500) {
      ctx.status = 500;
    }
    if (ctx && ctx.log && ctx.log.error) {
      if (!ctx.state.logged) {
        ctx.log.error(err.stack);
      }
    }
  }); 
}
