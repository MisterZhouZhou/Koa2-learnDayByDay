'use strict';

var apis = {};

//- exports = module.exports = apis;

var Blog = Database.models.blog;
var User = Database.models.user;
var dateFormat = require("dateformat");
const blogService = require('../services/BlogService');

// 用户登录api
exports.auth = async(ctx,next)=> {
  const {email, password} = ctx.request.body;
  if(email && password){
    let user = await User.getAccountByEmailAndPwd(email, password);
    if(user&&user.length>0){
       ctx.body = {
         status: 0
       };
       return;
    }
  }
  ctx.body = {
    status: -1,
    errorMessage: '账号或密码不对！'
  }
}


// 获取博客列表
exports.list = async (ctx,next)=> {
    ctx.body = await Blog.getBlogs();
}

exports.getBlog = async (ctx,next)=> {
    var blogId = ctx.params.blogId;
    ctx.body = await Blog.getBlogById(blogId);
}

// 创建博客
exports.createBlog = async (ctx,next)=> {
    let data = ctx.request.body;
    var blog = new Blog();
    blog.blog_content = data.blog_content;
    blog.blog_title = data.blog_title;
    blog.category = data.category;
    blog.tags = data.tags;
    blog.update_time = dateFormat((new Date()).getTime(), "yyyy-mm-dd hh:MM:ss");
    blog.create_time = blog.update_time;
    blog.status = "draft";
    blog.author = "rain";
    blog.save();
    ctx.body = {blog: blog};
}

// 更新博客
// 如果产生了两个博客帖子，那就说明这个服务不是idempotent的，因为多次使用产生了副作用了嘛；如果后一个请求把第一个请求覆盖掉了，那这个服务就是idempotent的。前一种情况，应该使用POST方法，后一种情况，应该使用PUT方法。
exports.updateBlog = async (ctx,next)=> {
    let data = ctx.request.body;
    console.log(JSON.stringify(data));
    var origin = await Blog.getBlogById(data._id);
    origin.blog_content = data.blog_content;
    origin.blog_title = data.blog_title;
    origin.category = data.category;
    origin.tags = data.tags;
    origin.status = data.status;
    origin.update_time = dateFormat((new Date()).getTime(), "yyyy-mm-dd hh:MM:ss");
    origin.save();
    ctx.body = {blog: origin};
}

exports.deleteBlog = async (ctx,next)=> {
    Blog.deleteById(ctx.params.blogId);
    ctx.body = {
        status: 0
    };
}
