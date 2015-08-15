var $$ = {
	toArray: function(object) {
		return [].slice.call(object);
	},
	assign: function(target,...rest
)
{
	if(target === undefined || target === null) {
		throw new TypeError('Cannot convert first argument to object');
	}
	rest.forEach(obj = > {
		if(obj === undefined || obj === null)
	{
		return;
	}
	Object.keys(obj).forEach(key = > {
		target[key] = obj[key];
}
)
;
})
;
}
}
;

module.exports = $$;