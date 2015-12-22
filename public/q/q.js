;(function(){
	var utils = window.utils = window.utils || {},
		is = utils.is,
		copy = utils.copy,
		coll = utils.coll.copy(),
		mod = utils.mod;

	var Q = utils.Q = coll.copy();

	Q.exec = function(){
		for (var i = 0; i < this.items.length; i++)
			this.items[i].apply(this.ctx || this, arguments);
	};
})();