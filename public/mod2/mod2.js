;(function(){
	var utils = window.utils = window.utils || {},
		is = utils.is,
		copy = utils.copy,
		coll = utils.coll.copy(),
		mod = utils.mod,
		sfn = utils.sfn,
		Q = utils.Q,
		Value = utils.Value;
	
	// LOG AUTOMATION
	var Logify = utils.Logify = function(obj){
		for (var i in obj)
			if (typeof obj[i] === 'function')
				logify(obj, i);
	};

	var logify = function(obj, fnName){
		var fn = obj[fnName];
		obj[fnName] = function(){
			this.log.fn(fnName, arguments);
			return this.log.ret(fn.apply(obj, arguments));
		};
	};

	var Mod2 = utils.Mod2 = mod.copy();
	Mod2.set = function(values){
		for (var i in values){
			if (is.fn(values[i])){
				this[i] = values[i];
				logify(this, i);
			} else if (is.simple(values[i])){
				this[i] = Value.copy();
				this[i](values[i]);
			} else {
				console.log('in order to vis this, we need a standalone log feature');
				this[i] = values[i];
			}
		}
	};
	Mod2.log = {
		fn: function(fnName, args){ console.group(fnName, args); console.groupCollapsed('innards'); },
		ret: function(ret){ console.groupEnd(); console.log('return', ret); console.groupEnd(); }
	};
})();