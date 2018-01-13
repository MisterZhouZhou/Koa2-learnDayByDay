var koa = require('koa');
var staticCache = require('koa-static-cache');
var path = require('path');
var mongoose = require('mongoose');
var logger = require('koa-logger');
var session = require('koa-session');
var favicon = require('koa-favicon');
const bodyparser = require('koa-bodyparser');
var mount = require('koa-mount');
var views = require('koa-views');
const staticFile = require('koa-static');
var log = require('util').log;
var routes = require('../routes');
var _ = require('underscore');
var R = require('koa-router');
var util = require('util');
var debug = require('debug')('server');

function Server(option) {
  this.opts = option || {};
}

// Inherit form 'koa'
Server.prototype = new koa();

Server.prototype.initGlobal = function() {
  global.Conf = this.opts;
  global._log = log;
  global.Database = require('./model_loader.js');
  debug("initlizing global");
}

Server.prototype.start = function() {
  var port = this.opts.port || 8000;
  this.use(session({signed: false,maxAge: 1000*60*60}, this));
  this.use(bodyparser());
  this.use(views(path.join(__dirname, "../views"), {extension: 'jade'}));
  this.use(favicon(path.join(__dirname, "../public/image/favicon.ico")));
  this.keys = [this.opts.secret] || "secret key string";
  // this.use(staticCache(path.join(this.opts.root, 'public'), {
  //   maxAge: 365 * 24 * 60 * 60 // 一年
  // }));

  this.use(logger());
  this.use(staticFile(path.join(__dirname, "../public")))
  this.loadMiddleWare();
  this.initRoutes();
  this.listen(port,()=>{
    _log('服务器运行于：127.0.0.1:'+port);
  });

  debug("Server listening on " + port);
}


Server.prototype.loadMiddleWare = function() {
  var initMw = require('./init_middlewares.js')();
  this.use(async (ctx, next)=>{
      ctx.session.tags = await initMw.inittags();
      ctx.session.archives = await initMw.initArchives();
    await next();
  });
}

Server.prototype.initRoutes = function() {
  var ctrls = require('./ctrl_loader.js');
  var router = new R();
  if(routes.length>0){
    _.each(routes, (route)=> {
      var handle = ctrls[route.ctrl][route.handle];
      router[route.method](route.url, handle);
    });
  }
  this.use(router.routes(), router.allowedMethods());
}

Server.prototype.connectDb = function() {
  mongoose.connect(this.opts.mongodb, {
    server: {
      poolSize: 12,
      socketOptions: {
        keepAlive: 1
      }
    }
  },(err, db)=>{
    if(err){
      _log('err:'+err);
    }else{
      console.log('数据库连接成功');
    }
  });
}

Server.prototype.errHandle = function(callback) {
  process.on('uncaughtException', callback);
}

// Server.prototype.config = function() {}

// Server.prototype.initCache = function() {}


exports = module.exports = Server;
