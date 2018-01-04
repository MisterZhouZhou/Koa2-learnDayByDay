const router = require('koa-router')();
const UserController = require('../controllers/user');


module.exports = (app)=>{
  
  router.post('/login', app.controller.user.login)

  router.post('/register', app.controller.user.register)

};