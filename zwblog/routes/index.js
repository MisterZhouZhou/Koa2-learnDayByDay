exports = module.exports = [{
        method: 'get',
        url: '/',
        ctrl: 'blog',
        handle: 'getnews'
    },{
        method: 'get',
        url: '/admin',
        ctrl: 'admin',
        handle: 'index'
    },{
        method: 'get',
        url: '/admin/login',
        ctrl: 'admin',
        handle: 'login'
    },{
        method: 'get',
        url: '/admin/register',
        ctrl: 'admin',
        handle: 'register'
    },{
        method: 'post',
        url: '/register/invite',
        ctrl: 'admin',
        handle: 'invite'
    },{
        method: 'post',
        url: '/login/authenticate',
        ctrl: 'admin',
        handle: 'auth'
    },{
        method: 'post',
        url: '/api/authenticate',
        ctrl: 'api',
        handle: 'auth'
    },{
        method: 'get',
        url: '/api/blogs',
        ctrl: 'api',
        handle: 'list'
    },{
        method: 'post',
        url: '/api/blogs',
        ctrl: 'api',
        handle: 'createBlog'
    },{
        method: 'get',
        url: '/blog/:id',
        ctrl: 'blog',
        handle: 'getblog'
    }, {
        method: 'put',
        url: '/api/blogs',
        ctrl: 'api',
        handle: 'updateBlog'
    },{
        method: 'delete',
        url: '/api/blogs/:blogId',
        ctrl: 'api',
        handle: 'deleteBlog'
    },{
        method: 'get',
        url: '/category/:category',
        ctrl: 'blog',
        handle: 'getblogbycategory'
    },{
        method: 'post',
        url: '/admin/loginout',
        ctrl: 'admin',
        handle: 'loginout'
    },{
        method: 'get',
        url: '/tag/:tag',
        ctrl: 'blog',
        handle: 'getblogbytag'
    },{
        method: 'get',
        url: '/archive/:archive',
        ctrl: 'blog',
        handle: 'getblogbyarchive'
    }];

// exports = module.exports = [ {
//     method: 'get',
//     url: '/backup',
//     ctrl: 'file',
//     handle: 'backup'
// }]
