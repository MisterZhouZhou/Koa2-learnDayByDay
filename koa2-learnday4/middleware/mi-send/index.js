module.exports = ()=>{
	function render(json){
		this.set('Content-Type','application/json');
		this.body = JSON.stringify(json);
	}
	return async (ctx, next)=>{
		// 将render挂载到ctx上
		ctx.send = render.bind(ctx); 
		await next();
	}
}