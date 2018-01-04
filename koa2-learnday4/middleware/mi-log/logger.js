 /**
   * 指定要记录的日志分类 cheese
   * 展示方式为文件类型 file
   * 日志输出的文件名 cheese.log
   */
  // appenders: { cheese: { type: 'file', filename: 'cheese.log' } },

  /**
   * 指定日志的默认配置项
   * 如果 log4js.getLogger 中没有指定，默认为 cheese 日志的配置项
   * 指定 cheese 日志的记录内容为 error 及 error 以上级别的信息
   */
  // categories: { default: { appenders: ['cheese'], level: 'error' } }

  // 低   -->   高
  // all -> trace -> debug -> info -> warn -> error -> fatal -> mark -> off


const log4js = require('log4js');
// 引入日志输出信息的封装文件
const access = require("./access.js");
const methods = ["trace", "debug", "info", "warn", "error", "fatal", "mark"];

// 提取默认公用参数对象
const baseInfo = {
  appLogLevel: 'debug', // 指定记录的日志级别
  dir: 'logs',          // 指定日志存放的目录名
  env: 'dev',   // 指定当前环境，当为开发环境时，在控制台也输出，方便调试
  projectName: 'koa2-learnday4',  // 项目名，记录在日志中的项目信息
  serverIp: '0.0.0.0'   // 默认情况下服务器 ip 地址
}

module.exports = (options) =>{
  const contextLogger = {};
  const appenders = {};

  // 继承自 baseInfo 默认参数
  const opts = Object.assign({}, baseInfo, options || {});
  // 需要的变量解构 方便使用
  const { env, appLogLevel, dir, serverIp, projectName } = opts;
  const commonInfo = { projectName, serverIp };

  appenders.cheese = {
    type: 'dateFile', // 日志类型
    filename: `${dir}/task`,  // 输出的文件名
    pattern: '-yyyy-MM-dd.log',  // 文件名增加后缀
    alwaysIncludePattern: true   // 是否总是有后缀名
  }

  // 环境变量为dev local development 认为是开发环境
  if (env === "dev" || env === "local" || env === "development") {
    appenders.out = {
      type: "console"
    }
  }

  let config = {
    appenders,
    categories: {
      default: {
        appenders: Object.keys(appenders),
        level: appLogLevel
      }
    }
  }
  const logger = log4js.getLogger('cheese');
  return async (ctx, next) =>{
    // 记录请求开始的时间
    const start = Date.now();
    log4js.configure(config);
    // 循环methods将所有方法挂载到ctx 上
    methods.forEach((method, i) => {
     contextLogger[method] = (message) => {
       // 将入参换为函数返回的字符串
        logger[method](access(ctx, message, commonInfo))
     };
    });
    ctx.log = contextLogger;
    await next();
    const end = Date.now();
    const responseTime = end - start;
     logger.info(access(ctx, {
      responseTime: `响应时间为${responseTime/1000}s`
    }, commonInfo));
  }
}
