;(function(){

	var utils = window.utils = window.utils || {},
		is = utils.is,
		copy = utils.copy,
		mod = utils.mod;

	var coll = utils.coll = mod.copy();
	coll.items = [];
	coll.add = function(){
		if(arguments.length){
			for(var i=0; i<arguments.length; i++){
				var arg = arguments[i];
				if (is.obj(arg))
					this.addObj(arg);
				else
					this.addItem(arg);
			}
		}
	};
	coll.addItem = function(item){
		this.items.push(item);
		return item;
	};
	coll.addObj = function(obj){
		for (var i in obj){
			if (this[i]){
				if (is.obj(obj[i]) && this[i].extend){
					this[i].extend(obj[i]);	
					this.addItem(obj[i]);
				} else {
					this.replace(this[i], obj[i]);
					this[i] = obj[i];
				}
			} else {
				this[i] = obj[i];
				this.addItem(obj[i]);
			}
			if (!obj[i]._name)
				obj[i]._name = i;
		}
	};
	coll.replace = function(item, newItem){
		var i = is.num(item) ? item : this.items.indexOf(item);
		if (i > -1)
			this.items.splice(i, 1, newItem);
	};
	coll.remove = function(item){
		var i = is.num(item) ? item : this.items.indexOf(item);
		if (i > -1)
			this.items.splice(i, 1);
	};
	coll.exec = function(){
		for (var i = 0; i < this.items.length; i++)
			this.items[i].apply(this.ctx || this, arguments);
	};
	coll.each = function(fn){
		for (var i = 0; i < this.items.length; i++){
			fn.call(this.items[i]); 
		}
	}

})();