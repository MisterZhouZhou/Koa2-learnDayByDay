const router = require('koa-router')();

router.get('/:page',async (ctx, next)=>{
    let page = ctx.params.page;
    ctx.state={
        title: page
    }
    await ctx.render(page,()=>{
      
    });
});

module.exports = router;