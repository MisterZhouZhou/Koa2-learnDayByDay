var router = require('koa-router')();
const crypto = require('crypto');




/**------------------------------------------------------------- */
// 主页
router.get('/', async (ctx, next)=> {
  console.log('=========');
  ctx.body = "dd";
  // await ctx.render('index', {
  //   title: 'OA',
  //   user: ctx.session.user
  // });
});


module.exports = router;
