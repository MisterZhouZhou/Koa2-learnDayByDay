module.exports = ()=> {
  var TagMap = require('./tag_maps.js');
  var _ = require('underscore');
  var dateFormat = require('dateformat');
  var Blog = Database.models.blog;
  return {
    inittags: async (ctx,next)=> {
      var tagsmap = new TagMap();
      var blogs = await Blog.getLatestPosts();
      _.each(blogs, function(item) {
        if (!_.isNull(item.tags)) {
          for (var i = 0; i < item.tags.length; i++) {
            if (!tagsmap.containsKey(item.tags[i])) {
              tagsmap.put(item.tags[i], 1);
            } else {
              tagsmap.addValue(item.tags[i]);
            }
          }
        }
      });
      return tagsmap.keyValues();
    },
    initArchives: async (ctx, next)=> {
      var blogs = await Blog.getBlogs();
      var archives = [];
      for (var i = 0; i < blogs.length; i++) {
        archives.push(dateFormat((new Date(blogs[i].create_time)).getTime(), "yyyy-mm"));
      }
      return _.uniq(archives);
    }
  }
}
