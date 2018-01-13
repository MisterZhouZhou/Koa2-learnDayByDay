var app = angular.module('blogManagePage', ['ui.ace']);
app.controller('blogController', ($scope,$rootScope,$http,$window,MainService)=> {
  $scope.aceLoaded = function(_editor){
    // Editor part
    var _session = _editor.getSession();
    var _renderer = _editor.renderer;
    _editor.setOptions({
        minLines: 10,
        maxLines: 40,
        wrap: true,
        firstLineNumber: 1,
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true
    });
  };
  // actions是行为的意思
  var actions = $scope.actions = {};
  $scope.blogs = [];
  // 初始化列表
  MainService.getBlogs($scope);
  // 切换到创建文章
  actions.create = function(){
    $scope.bodyState = "editor";
    $scope.currentBlog = {
                    errMsg: "",
                    tags: [],
                    isNew: true,
                    validate: function() {
                        var errArray = [];
                        if (!this.blog_title) {
                            errArray.push("文章标题不能为空！");
                        }
                        if (!this.blog_content) {
                            errArray.push("文章内容不能为空！");
                        }
                        if (!this.category) {
                            errArray.push("文章分类不能为空！");
                        }
                        if (this.tags) {
                            this.tags = this.tags.split(',');
                        }
                        if (!errArray.length) {
                            return true;
                        }
                        this.errMsg = errArray.join('  ');
                        return false;
                    }
                };
  }

  // 文章列表
  actions.articles = ()=>{
    $scope.bodyState = "articleList";
  }

  // 系统配置
  actions.systemConf = ()=>{
    $scope.bodyState = "manager";
  }

  // 注销
  actions.logout = ()=>{
    $scope.bodyState = "";
  }

  // 修改文章
  actions.modifyBlog = (blog)=>{
     $scope.currentBlog = {
          errMsg: "",
          tags: [],
          isNew: false,
          validate: function() {
              var errArray = [];
              if (!this.blog_title) {
                  errArray.push("文章标题不能为空！");
              }
              if (!this.blog_content) {
                  errArray.push("文章内容不能为空！");
              }
              if (!this.category) {
                  errArray.push("文章分类不能为空！");
              }
              if (!this.tags || !this.tags.length) {
                  this.tags = this.tags;
              }
              if (!errArray.length) {
                  return true;
              }
              this.errMsg = errArray.join('  ');
              return false;
          }
      };
      for (var pro in blog) {
          $scope.currentBlog[pro] = blog[pro];
      }
      $scope.bodyState = "editor";
  }

  // 提交文章
  actions.createBlog = ()=>{
    if (!$scope.currentBlog.validate()) {
        $("#alertMsg").show();
    }else{
      let {blog_title,category,tags,blog_content,status} = $scope.currentBlog;
      let newtags = tags;
      if(typeof tags == 'string'){
        newtags = tags.split(',');
      }
      let blogdata = {blog_title: blog_title, category: category,tags: newtags, blog_content:blog_content, status: status};  
      if ($scope.currentBlog.isNew) {
        MainService.createBlog(blogdata, function(data) {
            $scope.blogs.push(data.blog);
            $scope.bodyState = "articleList";
        });
      }else{
        blogdata._id = $scope.currentBlog._id;
        MainService.updateBlog(blogdata, function(data) {
          for (var i = 0; i < $scope.blogs.length; i++) {
            if ($scope.blogs[i]._id == data.blog._id) {
              $scope.blogs[i] = data.blog;
              break;
            }
          }
          $scope.bodyState = "articleList";
        });
      }
    }
  }

  // 删除文章
  actions.deleteBlog = (blogid)=>{
    MainService.deleteBlog(blogid, function(res) {
       if(res.status == 0){
          let index = -1;
          for (var i = 0; i < $scope.blogs.length; i++) {
            if ($scope.blogs[i]._id == blogid) {
              index = i;
              break;
            }
          }
          if(index>-1){
              $scope.blogs.splice(index,1);
          }
       }
    });
  }

  // 发布文章
  actions.draff = (blog)=>{
    let tempBlog = blog;
    tempBlog.status = "draft";
    MainService.updateBlog(tempBlog, function(data) {
      for (var i = 0; i < $scope.blogs.length; i++) {
        if ($scope.blogs[i]._id == data.blog._id) {
          $scope.blogs[i] = data.blog;
          break;
        }
      }
    });
  }

  // 取消发布
  actions.disdraff = (blog)=>{
    let tempBlog = blog;
    tempBlog.status = "disdraft";
    MainService.updateBlog(tempBlog, function(data) {
      for (var i = 0; i < $scope.blogs.length; i++) {
        if ($scope.blogs[i]._id == data.blog._id) {
          $scope.blogs[i] = data.blog;
          break;
        }
      }
    });
  }


  // 退出登录
  actions.loginOut = ()=>{
    MainService.loginOut(function(res) {
       if(res.status == 0){
          $window.location.href = '/admin/login';
       }
    });
  }

  // 配置文章
  actions.config = (blog)=>{
    $scope.currentBlog = {
          errMsg: "",
          tags: [],
          isNew: false,
          validate: function() {
              var errArray = [];
              if (!this.blog_title) {
                  errArray.push("文章标题不能为空！");
              }
              if (!this.blog_content) {
                  errArray.push("文章内容不能为空！");
              }
              if (!this.category) {
                  errArray.push("文章分类不能为空！");
              }
              if (!this.tags || !this.tags.length) {
                  this.tags = this.tags;
              }
              if (!errArray.length) {
                  return true;
              }
              this.errMsg = errArray.join('  ');
              return false;
          }
      };
      for (var pro in blog) {
          $scope.currentBlog[pro] = blog[pro];
      }
  }

});


// angular.module('myApp', ['myApp1']);
