module.exports = {
	getData: function(ctx) {
		var data;
		if (ctx.instance)
			data = ctx.instance;
		else if (ctx.where)
			data = ctx.data;
		return data;
	}
};