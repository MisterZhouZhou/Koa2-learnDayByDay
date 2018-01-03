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
const methods = ["trace", "debug", "info", "warn", "error", "fatal", "mark"];

module.exports = (options) =>{
  const contextLogger = {};
  log4js.configure({
    appenders: {
      cheese: {
       type: 'dateFile', // 日志类型
       filename: `logs/task`,  // 输出的文件名
       pattern: '-yyyy-MM-dd.log',  // 文件名增加后缀
       alwaysIncludePattern: true   // 是否总是有后缀名
     }
    },
    categories: {
      default: {
        appenders: ['cheese'],
        level:'info'
      }
    }
  });
  const logger = log4js.getLogger('cheese');
  return async (ctx, next) =>{
    // 记录请求开始的时间
    const start = Date.now();
    // 循环methods将所有方法挂载到ctx 上
    methods.forEach((method, i) => {
     contextLogger[method] = (message) => {
       logger[method](message)
     };
    });
    ctx.log = contextLogger;

    await next();
    const end = Date.now();
    const responseTime = end - start;
    logger.info(`响应时间为${responseTime/1000}s`);
  }
}
