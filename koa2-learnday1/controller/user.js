const UserService = require('../service/user')

exports.postData = async (ctx,next)=>{
    ctx.body = 
    `
    <form action="http://127.0.0.1:3000/user/register" method="post">
        <input name="name" type="text" placeholder="请输入用户名：zw"/> 
        <br/>
        <input name="password" type="text" placeholder="请输入密码：123456"/>
        <br/> 
        <button>提交</button>
      </form>
    `
}

exports.register = async (ctx,next)=>{
    console.log(JSON.stringify(ctx.request.body));
    let body = ctx.request.body;
    let data = await UserService.register(body.name, body.password);
    ctx.body = data;
}