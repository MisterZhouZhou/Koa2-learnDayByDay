const router = require('koa-router')();
const userController = require('../controller/user');


// 设置路由前缀
// router.prefix('/user');

router.get('/', function (ctx, next) {
  ctx.body = 'this a users response!';
});
  
router.get('/postData', userController.postData);
router.post('/register', userController.register);
// router.get('/postData',async (ctx,next)=>{
//     ctx.body = 
//     `
//     <form action="http://127.0.0.1:3000/user/register" method="post">
//         <input name="name" type="text" placeholder="请输入用户名：zw"/> 
//         <br/>
//         <input name="password" type="text" placeholder="请输入密码：123456"/>
//         <br/> 
//         <button>提交</button>
//       </form>
//     `
// });

// router.post('/register', async (ctx, next)=>{
//     console.log(JSON.stringify(ctx.request.body));
//     let body = ctx.request.body;
//     ctx.body = body;
// });

module.exports = router;