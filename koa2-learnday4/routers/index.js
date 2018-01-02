const router = require('koa-router')();
const HomeController = require('../controllers/home');
const user_router = require('./user');

module.exports = (app) => {

  router.get( '/', HomeController.index)

  router.get('/home', HomeController.home)

  router.get('/home/:id/:name', HomeController.homeParams)

  router.get('/login', HomeController.login);

  router.use('/user', user_router.routes(), user_router.allowedMethods());

  app.use(router.routes(),router.allowedMethods());
}
