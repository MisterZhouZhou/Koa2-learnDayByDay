const router = require('koa-router')();
// const user_router = require('./user');

module.exports = (app) => {

  router.get( '/', app.controller.home.index);

  router.get('/home', app.controller.home.home)

  router.get('/home/:id/:name', app.controller.home.homeParams)

  router.get('/login', app.controller.home.login);

  router.post('user/login', app.controller.home.login);

  router.post('user/register', app.controller.home.register);

  // router.use('/user', user_router.routes(), user_router.allowedMethods());

  app.use(router.routes(),router.allowedMethods());
}


// const router = require('koa-router')()

// module.exports = (app) => {
//   router.get( '/', app.controller.home.index )
  
//   router.get('/home', app.controller.home.home)
  
//   router.get('/home/:id/:name', app.controller.home.homeParams)
  
//   router.get('/user', app.controller.home.login)
  
//   router.post('/user/register', app.controller.home.register)
  
//   app.use(router.routes())
//      .use(router.allowedMethods())
// }