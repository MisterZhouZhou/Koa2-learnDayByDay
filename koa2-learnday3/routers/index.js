const router = require('koa-router')();
const dataController = require('../controller/staticdata');

router.get('/welcome',async (ctx, next)=>{
   ctx.body = 'welcome zw'
});

router.get('/sites', dataController.sites);

router.get('/customers', dataController.customers);


router.get('/:page',async (ctx, next)=>{
    let page = ctx.params.page;
    ctx.state={
        title: page
    }
    await ctx.render(page,()=>{
      
    });
});



module.exports = router;