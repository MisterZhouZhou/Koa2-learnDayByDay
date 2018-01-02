const router = require('koa-router')();

router.get('/welcome',async (ctx, next)=>{
   ctx.body = 'welcome zw'
});

router.get('/sites', async (ctx, next)=>{
	let sites = [
        {
            "Name": "菜鸟教程",
            "Url": "www.runoob.com",
            "Country": "CN"
        },
        {
            "Name": "Google",
            "Url": "www.google.com",
            "Country": "USA"
        },
        {
            "Name": "Facebook",
            "Url": "www.facebook.com",
            "Country": "USA"
        },
        {
            "Name": "微博",
            "Url": "www.weibo.com",
            "Country": "CN"
        }
    ]
	ctx.body = {
		sites
	}
});


router.get('/:page',async (ctx, next)=>{
    let page = ctx.params.page;
    ctx.state={
        title: page
    }
    await ctx.render(page,()=>{
      
    });
});



module.exports = router;