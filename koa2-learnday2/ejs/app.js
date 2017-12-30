const Koa = require('koa');
const views = require('koa-views');
const app = new Koa();

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

app.use( async ( ctx ) => {
  let title = 'hello koa2'
  await ctx.render('index', {
    title,
  })
})

app.listen(3000, ()=>{
  console.log('[demo] ejs is starting at port 3000')
})