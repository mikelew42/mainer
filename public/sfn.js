;(function(){

	var utils = window.utils = window.utils || {},
		is = utils.is,
		copy = utils.copy;

	var sfn = utils.sfn = function(){
		var arg, fn = function(){
			return fn.main.apply(fn, arguments);
		};

		fn.assign = function(obj){
			for (var i in obj)
				this[i] = obj[i];
		};

		fn.copy = copy.oo;

		fn.main = function(){};

		if(arguments.length){
			for(var i=0; i<arguments.length; i++){
				arg = arguments[i];
				if (typeof arg === "object")
					fn.assign(arg);
				else if (typeof arg === "function")
					fn.main = arg;
			}
		}

		fn.Base = sfn;
		
		return fn;
	};

})();