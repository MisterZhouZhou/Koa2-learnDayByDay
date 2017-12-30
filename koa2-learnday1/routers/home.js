const router = require('koa-router')();

router.get('/', function (ctx, next) {
  ctx.body = 'this a home response!';
});

router.get('/show',async (ctx,next)=>{
    ctx.body = 'home show';
});

module.exports = router;