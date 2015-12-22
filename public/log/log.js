;(function(){
	
	var utils = window.utils = window.utils || {},
		is = utils.is,
		mod = utils.mod,
		sfn = utils.sfn;


	var expandable = function(view){

		view.$el.addClass('collapsed');

		view.$preview.click(function(){
			view.toggle();
		});

		view.toggle = function(){
			var view = this;
			if (view.$el.hasClass('collapsed') || view.$el.hasClass('collapsing'))
				this.expand();
			else 
				this.collapse();
		};

		view.expand = function(){
			var view = this;
			this.$el.addClass('expanding').removeClass('collapsed');
			this.$content.slideDown(function(){
				view.$el.removeClass('expanding').addClass('expanded');
			});
		};
		
		view.collapse = function(){
			var view = this;
			this.$el.addClass('collapsing').removeClass('expanded');
			this.$content.slideUp(function(){
				view.$el.removeClass('collapsing').addClass('collapsed');
			});
		};

	};
	
	var $expandable = function($el, $preview, $content){

		$el.addClass('collapsed');

		$preview.click(function(){
			toggle();
		});

		function toggle(){
			if ($el.hasClass('collapsed') || $el.hasClass('collapsing'))
				expand();
			else 
				collapse();
		}

		function expand(){
			$el.addClass('expanding').removeClass('collapsed');
			$content.slideDown(function(){
				$el.removeClass('expanding').addClass('expanded');
			});
		};
		
		function collapse(){
			$el.addClass('collapsing').removeClass('expanded');
			$content.slideUp(function(){
				$el.removeClass('collapsing').addClass('collapsed');
			});
		};

		return {
			toggle: toggle,
			expand: expand,
			collapse: collapse
		} // extend these onto the view?  this provides an API
	};

	/* Or, what if for each module, you could request dep injection: 

	mod.define('newFnName', ['dep1', 'dep2', function(dep1, dep2){
		// now, you can access these without having to use "this".
		// you can more easily write functions without having to worry about relative references
		// you can override functions if you use the same dep inj to redefine these 'local vars'
	}]);
	*/

	var ValueView = mod.copy();
	ValueView.render = function(){
		this.$el = $("<div></div>").addClass('item simple value');
		this.$inlinePreview = $("<span></span").addClass('inline-preview').html(this.value);
		if (this._name){
			this.$el.html(this._name + ": ");
		}
		this.$el.append(this.$inlinePreview);
		return this.$el;
	};

	var ValuesView = mod.copy();
	ValuesView.render = function(){
		this.$el = $("<div></div>").addClass('item values');
		this.renderValues();
		return this.$el;
	};
	ValuesView.renderValues = function(){
		var view;
		for (var i in this.values){
			view = viewer(this.values[i]);
			view._name = i;
			this.$el.append(view.render());
		}
	};

	var ObjView = mod.copy();
	ObjView.render = function(){
		this.$el = $("<div></div>").addClass('item obj value');
		this.$el.append(this.renderPreview());
		this.$el.append(this.renderContent());
		this.handlers();
		return this.$el;
	};
	ObjView.renderPreview = function(){
		this.$preview = $("<div></div>").addClass('preview');
		this.$inlinePreview = $("<span></span>").addClass('inline-preview').html('{object}');
		if (is.def(this._name)){
			this.$preview.html(this._name + ": ");
		}
		this.$preview.append(this.$inlinePreview);
		return this.$preview;
	};
	ObjView.renderContent = function(){
		var propView;
		this.$content = $("<div></div>").addClass('content').hide();
		for (var i in this.obj){
			if (i[0] === "$"){
				propView = viewer(typeof this.obj[i] + " <i>reference</i>");
				propView._name = i;
				this.$content.append(propView.render());
			} else {
				propView = viewer(this.obj[i]);
				propView._name = i;
				this.$content.append(propView.render());	
			}
		}
		return this.$content;
	};
	ObjView.handlers = function(){
		var view = this;
		expandable(this);
		this.$el.click(function(){
			view.focus();
		});
		this.$el.clickOff(function(){
			view.unfocus();
		});
	};

	ObjView.focus = function(){
		this.$el.addClass('focus');
	};
	ObjView.unfocus = function(){
		this.$el.removeClass('focus');
	};

/* ArrView */
	var ArrView = ObjView.copy();
	ArrView.render = function(){
		this.$el = $("<div></div>").addClass('item arr value');
		this.$el.append(this.renderPreview());
		this.$el.append(this.renderContent());
		this.handlers();
		return this.$el;
	};
	ArrView.renderPreview = function(){
		this.$preview = $("<div></div>").addClass('preview').html(this._name + ": ");
		this.$inlinePreview = $("<span></span>").addClass('inline-preview').html("[array]").appendTo(this.$preview);
		return this.$preview;
	};

	var FnView = mod.copy();
	FnView.render = function(){
		this.$el = $("<div></div>").addClass('fn value item');
		this.$el.append(this.renderPreview());
		this.$el.append(this.renderContent());
		this.handlers();
		return this.$el;
	};
	FnView.renderPreview = function(){
		this.$preview = $("<div></div>").addClass('preview')
			.html(this._name + ": function");
		return this.$preview;
	};
	FnView.renderContent = function(){
		this.$content = $("<div></div>")
		.addClass('content')
		.html("<pre>" + this.fn.toString() + "</pre>")
		.hide();
		return this.$content;
	};
	FnView.handlers = function(){
		var view = this;
		this.$preview.click(function(){
			view.$content.toggle();
		});
	};

	window.viewer = function(value){
		var view;
		if (is.simple(value)){
			view = ValueView.copy();
			view.value = value;
		// } else if (is.arr(value)){
		// 	view = ArrView.copy();
		// 	view.arr = value;
		} else if (is.obj(value)){
			view = ObjView.copy();
			view.obj = value;
		} else if (is.arr(value)){
			view = ArrView.copy();
			view.arr = value;
		} else if (is.fn(value)){
			view = FnView.copy();
			view.fn = value;
		}
		return view;
	};

	var logger = sfn(function(){
		this.log.apply(this, arguments);
	},{
		type: 'group',
		logs: [],
		log: function(log, value){
			var newLog, name;
			if (is.def(value)){
				// fn sig:  log(name, value)
				name = log;
				log = value;
			} else {
				// fn sig:  log(msg), log(logger), log(anonValue)
				if (log && log.type === 'group'){
					window.log.setActiveLogger(log);
					return this.addLog(log);
				} else if (is.str(log)){
					newLog = viewer(log);
					// newLog._name = "message";
					newLog.type = "message";
					return this.addLog(newLog);
				} else if (is.simple(log)){
					newLog = viewer(log);
					return this.addLog(newLog);
				} else if (is.obj(log)){
					newLog = ValuesView.copy();
					newLog.values = log;
					newLog.type = "dict";
					return this.addLog(newLog);
				}
			}
		},
		addLog: function(log){
			this.logs.push(log);
			if (this.rendered)
				this.$content.append(log.render());
			return log;
		},
		close: function(){
			window.log.closeGroup();
		},
		each: function(fn){
			for (var i = 0; i < this.logs.length; i++){
				fn.call(this.logs[i]); 
			}
		},
		render: function(){
			this.$el = $("<div></div>").addClass('item logger');
			this.renderContent();
			this.rendered = true;
			return this.$el;
		},
		renderContent: function(){
			var logger = this;
			this.$content = $("<div></div>").addClass('content logs');
			this.each(function(){
				logger.$content.append(this.render());
			});
			this.$content.appendTo(this.$el);
		}
	});

	window.log = logger.copy();
	window.log.main = function(){
		this.activeLogger.log.apply(this.activeLogger, arguments);
	};
	window.log.init = function(){
		this.activeLogger = this;
		this.logs = [];
		this.lastLoggers = [];
	};

	window.log.render = function(){
		this.$el = $("<div></div>").addClass('logger main-logger');
		this.$el.append("<h3>Logger</h3>");
		this.renderContent();
		this.rendered = true;
		return this.$el;
	};

	window.log.setActiveLogger = function(logger){
		this.lastLoggers.push(this.activeLogger);
		this.activeLogger = logger;
	};
	window.log.closeGroup = function(){
		this.activeLogger = this.lastLoggers.pop();
	};

	window.log.init();
	log('yepp');

	var FnCapture = logger.copy();
	FnCapture.render = function(){
		this.$el = $("<div></div>").addClass('item logger fn-capture');
		this.$preview = $("<div>"+ this.fnName +"(); </div>").addClass('preview');
		this.$el.prepend(this.$preview);
		expandable(this);
		this.renderContent();
		this.$content.hide();
		this.renderReturn();
		this.rendered = true;
		return this.$el;
	};
	FnCapture.renderReturn = function(){
		var view;
		if (this.ret){
			console.log(this.ret);
			this.$ret = $("<div>return </div>").addClass('ret');
			view = viewer(this.ret);
			view.render();
			console.log(view);
			if (view.$inlinePreview){
				this.$ret.append(view.$inlinePreview)
			} else {
				this.$ret.append(view.$el);
			}
			this.$ret.appendTo(this.$el);
		}
	};

	var logify = function(obj){
		for (var i in obj){
			if (is.fn(obj[i])){

			}
		}
	};

	var someSubFn = function(){
		log('this is from inside someSubFn');
	};

	var testFn1 = function(){
		var testFn1Logger = FnCapture.copy();
		testFn1Logger.fnName = 'testFn1';
		log(testFn1Logger);
		someSubFn();
		testFn1Logger.close();
	};

	var testFn2 = function(){
		var testFn2Logger = FnCapture.copy();
		testFn2Logger.fnName = 'testFn2';
		log(testFn2Logger);
		log('testFn2 called, and log group created');
		testFn1();
		log('testFn1 finished');
		testFn2Logger.close();
	};

	var testObj = {
		method1: function(){
			return 5;
		},
		method2: function(){
			log('about to call method 3');
			this.method3();
			log('just called method 3');
			return this.method4();
		},
		method3: function(){
			log('hello, im method 3');
		},
		method4: function(){
			return {
				ret1: 1,
				ret2: 'weeee'
			};
		}
	};

	// LOG AUTOMATION
	var Logify = utils.Logify = function(obj, name){
		for (var i in obj)
			if (typeof obj[i] === 'function')
				logify(obj, i, name);
	};

	var logify = function(obj, fnName, objName){
		var fn = obj[fnName];
		obj[fnName] = function(){
			var capture = FnCapture.copy();
			capture.fnName = objName ? objName + "." + fnName : fnName ;
			capture.args = arguments;
			log(capture);
			capture.ret = fn.apply(obj, arguments);
			capture.close();
			return capture.ret;
		};
	};

	Logify(testObj, 'testObj');

	$(function(){
		testObj.method1();
		testObj.method2();
		log({
			one: 1,
			two: "two",
			three: {
				hmm: "xyz?"
			}
		});
		$('body').append(window.log.render());

		testFn1();
		log('yeeerrrppp');
		log(5);
		testFn2();
	});
})();