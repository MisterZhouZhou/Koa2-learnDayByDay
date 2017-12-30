
const router = require('koa-router')();

router.get('/',async (ctx, next)=>{
    let title = 'home';
    await ctx.render('home',{
        title
    });
});

module.exports = router;