;(function(){
	var copy = utils.copy;
	var mod = utils.mod = { 
		copy: copy.oo,
		copyTo: utils.copyTo,
		assign: function(obj){
			for (var i in obj)
				this[i] = obj[i];
		},
		install: function(mod){
			mod.copyTo(this);
		}
	};

})();