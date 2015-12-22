;(function(){
	
	var utils = window.utils = window.utils || {},
		is = utils.is;

	var getBase = function(value){
		return (value.Base && value.Base()) || 
				(is.obj(value) && {}) || 
				(is.arr(value) && []);
	};

	var returnable = function(value){
		return !is.def(value) || is.val(value) || (is.fn(value) && !value.Base);
	};
	
	var copy = utils.copy = function(value, base, ctx){
									// this is necessary to maintain ctx arg
		if(value && value.copy && value.copy !== copy.oo)
			return value.copy();

		if (returnable(value))
			return value;
		
		base = base || getBase(value);

		for (var i in value){
			if (value[i] === ctx || i[0] === "$")
				continue;
			base[i] = copy(value[i], null, value);
		}

		return base;
	};
	
	utils.copy.oo = function(){
		return copy(this);
	};

	utils.copyTo = function(base){
		return copy(this, base);
	};

})();