const router = require('koa-router')();
const UserController = require('../controllers/user');

router.get('/login', UserController.login)

router.post('/register', UserController.register)

module.exports = router;
