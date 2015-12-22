;(function(){
	
	var utils = window.utils = window.utils || {},
		is = utils.is,
		copy = utils.copy,
		coll = utils.coll.copy();

	var log = utils.log = coll.copy();

	var LogItem = utils.mod.copy();
	LogItem.render = function(){
		this.$el = $("<div></div>").addClass('log-item');
		this.renderMeta();
	};
	LogItem.renderMeta = function(){
		this.$meta = $("<div></div>").addClass('meta').html(window.performance.now()).appendTo(this.$el);
	};
	var LogMsg = LogItem.copy();
	LogMsg.msg = function(msg){
		this.msg = msg;
		this.render();
		this.$msg = $("<div></div>").addClass('msg').html(msg).appendTo(this.$el);
	};

	var LogValue = LogItem.copy();
	LogValue.value = function(name, value){
		this.name = name;
		this.value = value;
		this.render();
		this.renderValue();
	};
	LogValue.renderValue = function(){
		this.$el.addClass('value');
		if (is.obj(this.value))
			this.renderObj();
		else if (is.arr(this.value))
			this.renderArr();
		else if (is.fn(this.value))
			this.renderFn();
		else
			this.renderSimple();
	};
	LogValue.renderObj = function(){
		this.$el.addClass('object');
		this.$el.append(this.name + ": (object)");
		this.props = {};
		for (var i in this.value){
			this.props[i] = LogValue.copy();
			this.props[i].value(i, this.value[i]);
			this.$el.append(this.props[i].$el);
		}
	};
	LogValue.renderArr = function(){
		this.$el.html('arr').addClass('arr');
	};
	LogValue.renderSimple = function(){
		this.$el.html(this.name + ": " + this.value + " (" + typeof this.value + ")").addClass(typeof this.value);
	};

	var LogValues = LogItem.copy();
	LogValues.values = function(values){
		this.values = values;
		this.render();
		this.$values = $("<div></div>").addClass('values').appendTo(this.$el);
		this.renderValues();
	};
	LogValues.renderValues = function(){
		var lv;
		this.lvs = [];
		for (var i in this.values){
			lv = LogValue.copy();
			lv.value(i, this.values[i]);
			this.$values.append(lv.$el);
			this.lvs.push(lv);
		}
	};

	// $(function(){
	// 	var $LogItemPanel = $("<div></div>");
	// 	App.tabs.add({
	// 		LogItem: $LogItemPanel
	// 	});
	// 	setTimeout(function(){
	// 		App.tabs.tabs.LogItem.activate();
	// 	},1000);

	// 	var logItem = LogMsg.copy();
	// 	// logItem.renderMeta();
	// 	logItem.msg('testing');
	// 	$LogItemPanel.append(logItem.$el);
		

	// 	var valuesLog = LogValues.copy();
	// 	valuesLog.values({
	// 		test: 123,
	// 		str: "four",
	// 		obj: {
	// 			five: "six",
	// 			seven: 8
	// 		}
	// 	});

	// 	$LogItemPanel.append(valuesLog.$el);
	// });

	var LogColl = utils.LogColl = coll.copy();
	LogColl.render = function(){
		this.$el = $("<div></div>").addClass('log-coll');
		this.$el.append(this.renderPreview());
		this.$el.append(this.renderChildren());
		return this.$el;
	};
	LogColl.renderPreview = function(){
		var self = this;
		this.$preview = $("<div>").addClass('preview').html(this.name).click(function(){
			self.$children.toggle();
		});
		return this.$preview;
	};
	LogColl.renderChildren = function(){
		this.$children = $("<div></div>").addClass('children');
		for (var i in this.items){
			this.$children.append(this.items[i].render());
		}
		return this.$children;
	};

	log.render = function(){
		this.$el = $("<div></div>").addClass('log').html(window.performance.now());
		if (this.msg)
			this.$el.append("<div>"+this.msg+"</div>");
		else if (this.values)
			this.renderValues();
		this.renderChildren();
		return this.$el;
	};

	log.log = function(values){
		// grab stack trace
		var l = log.copy();
		if (is.obj(values))
			l.values = copy(values); // take a snapshot
		else if (is.str(values))
			l.msg = values;
		this.addItem(l);
		this.$children && this.$children.append(l.render());
		return l;
	};

	var valueView = utils.mod.copy();
	valueView.render = function(){
		this.$el = $("<div></div>").addClass('value').html(this.name + ": " + this.value);
		return this.$el;
	};

	var objView = utils.mod.copy();
	objView.render = function(){
		this.$el = $("<div></div>").addClass('object').html(this.name + " (object)");
		this.renderProps();
		return this.$el;
	};
	objView.renderProps = function(){
		for (var i in this.value){
			this[i] = getView(this.value[i]);
			this[i].name = i;
			this[i].value = this.value[i];
			this.$el.append(this[i].render());
			this[i].$el.addClass('prop');
		}
	};

	var getView = function(value){
		if (is.obj(value))
			return objView.copy();
		else if (is.arr(value))
			return arrView.copy();
		else
			return valueView.copy();
	};

	log.renderValues = function(){
		var values;
		if (this.values){
			values = this.values;
			for (var i in values){
				this[i] = getView(values[i]);
				this[i].name = i;
				this[i].value = values[i];
				this.$el.append(this[i].render());
			}
		}
	};

	log.renderChildren = function(){
		if (this.items.length){
			this.$children = $("<div></div>").addClass('children');
			for (var i = 0; i < this.items.length; i++){
				this.$children.append(this.items[i].render());
			}
			this.$el.append(this.$children);
		}
	};

})();