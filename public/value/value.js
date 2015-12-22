;(function(){
	var utils = window.utils = window.utils || {},
		is = utils.is,
		copy = utils.copy,
		coll = utils.coll.copy(),
		mod = utils.mod,
		sfn = utils.sfn,
		Q = utils.Q;

	var Value = utils.Value = sfn(function(){
		if (arguments.length){
			return this.set.apply(this, arguments);
		} else {
			return this.get.call(this);
		}
	}, {
		set: function(val){
			if (this.value !== val){
				this.value = val;
				this.change.exec(val);
			}
		},
		get: function(){
			return this.value;
		},
		change: Q.copy()
	});
})();