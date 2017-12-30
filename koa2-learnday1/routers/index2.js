const router = require('koa-router')();
const index = require('./index');
const user = require('./user');
const home = require('./home');

module.exports = (app) => {
    // router.use('/',index.routes(), index.allowedMethods());
    router.use('/user',user.routes(), user.allowedMethods());
    router.use('/home',home.routes(), home.allowedMethods());
    app.use(router.routes(), router.allowedMethods());
}