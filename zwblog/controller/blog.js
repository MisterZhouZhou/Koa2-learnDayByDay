var Blog = Database.models.blog;
var _ = require('underscore');
var marked = require('marked');
var dateFormat = require('dateformat');

// 时间格式处理
function timeFormat(time){
    let tempTime = (new Date(time - 4 * 3600 * 1000)).toISOString().split('.')[0];
    let tempArray  = tempTime.split('T');
    let newTime = tempArray[0] +' '+ tempArray[1];
    return newTime;
}

exports.getnews = async(ctx,next)=> {
    var blogs = await Blog.getLatestPosts();
    var bloglist = [];
    blogs.forEach(function(item) {
        var blog = {
            blogId: item._id,
            blog_title: item.blog_title,
            author_name: item.author,
            blog_content: item.blog_content,
            blog_tags: item.tags,
            browse_times: item.visits,
            update_time: timeFormat(item.update_time)
        };
        bloglist.push(blog);
    });
    await ctx.render('index',{
        config: Conf.template,
        title: '最新文章',
        articles: bloglist,
        tags:  ctx.session.tags || [],
        archives: ctx.session.archives || []
    });
}

exports.getblog = async(ctx,next)=> {
    var blog = await Blog.getBlogById(ctx.params.id);
    blog.visits++;
    blog.save();
    var resblog = {
        blogId: blog._id,
        blog_title: blog.blog_title,
        blog_content: marked(blog.blog_content),
        update_time: timeFormat(blog.update_time),
        author_name: blog.author,
        blog_tags: blog.tags,
        browse_times: blog.visits
    };
    if (!_.isNull(blog)) {
        await ctx.render("blog/article", {
            config: Conf.template,
            title: resblog.blog_title,
            blog: resblog,
            disqus: Conf.disqus_shortname,
            tags:  ctx.session.tags || [],
            archives: ctx.session.archives || []
        });
    }
};

//  获取分类
exports.getblogbycategory = async (ctx,next)=>{
    var blogs = await Blog.getCategoryPosts(ctx.params.category);
    var bloglist = [];
    blogs.forEach(function(item) {
        var blog = {
            blogId: item._id,
            blog_title: item.blog_title,
            update_time: timeFormat(item.update_time),
            author_name: item.author,
            blog_tags: item.tags,
            browse_times: item.visits
        };
        bloglist.push(blog);
    });
    await ctx.render('index', {
            config: Conf.template,
            title: ctx.params.category,
            articles: bloglist,
            tags: ctx.session.tags,
            archives: ctx.session.archives
        });

};

// tag 文章列表
exports.getblogbytag = async(ctx,next)=> {
    var blogs = await Blog.getBlogsByTag(ctx.params.tag);
    var bloglist = [];
    blogs.forEach(function(item) {
        var blog = {
            blogId: item._id,
            blog_title: item.blog_title,
            update_time: timeFormat(item.update_time),
            author: item.author,
            tags: item.tags,
            browse_times: item.visits
        };
        bloglist.push(blog);
    });
    await ctx.render('index', {
            config: Conf.template,
            title: ctx.params.tag,
            articles: bloglist,
            tags: ctx.session.tags,
            archives: ctx.session.archives
        });
};

// archive
exports.getblogbyarchive = async (ctx,next)=>{
    let s_archive = ctx.params.archive;
    let blogs = await Blog.getBlogs();
    let archives = [];
    for (var i = 0; i < blogs.length; i++) {
        let timeF = dateFormat((new Date(blogs[i].create_time)).getTime(), "yyyy-mm");
        if(timeF == s_archive){
            var blog = {
                blogId: blogs[i]._id,
                blog_title: blogs[i].blog_title,
                update_time: timeFormat(blogs[i].update_time),
                author: blogs[i].author,
                tags: blogs[i].tags,
                browse_times: blogs[i].visits
            };
            archives.push(blog);
        }
    }
    await ctx.render('index', {
            config: Conf.template,
            title: ctx.params.tag,
            articles: archives,
            tags: ctx.session.tags,
            archives: ctx.session.archives
        });
}
