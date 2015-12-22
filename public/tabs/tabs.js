;(function(){

	var utils = window.utils = window.utils || {},
		is = utils.is;

	var tab = utils.mod.copy();
	tab.init = function(name, $target, tabs){
		this.name = name;
		this.$target = $target.addClass('target');
		this.$tabs = tabs;

		this.renderBtn();
		tabs.addTab(this);
	};
	tab.renderBtn = function(){
		var self = this;
		this.$btn = $("<div></div>")
			.css('display', 'inline-block')
			.addClass('btn')
			.html(this.name)
			.click(function(){
				self.activate()
			});

		return this.$btn;
	};
	tab.activate = function(){
		this.tabs.hideAll();
		this.$target.show();
		this.$btn.addClass('active');
	};

	var tabs = utils.tabs = utils.mod.copy();
	tabs.render = function(){
		this.$el = $("<div></div>").addClass('tabs');
		this.$btns = $("<div></div>").addClass('btns').appendTo(this.$el);
		this.$targets = $("<div></div>").addClass('targets').appendTo(this.$el);
		return this.$el;
	};
	tabs.add = function(obj){
		this.tabs = this.tabs || {};
		for (var i in obj){
			this.tabs[i] = tab.copy();
			this.tabs[i].init(i, obj[i], this);
		}
	};

	tabs.addTab = function(tab){
		this.$btns.append(tab.$btn);
		this.$targets.append(tab.$target.hide());
	};

	tabs.hideAll = function(){
		for (var i in this.tabs){
			this.tabs[i].$target.hide();
			this.tabs[i].$btn.removeClass('active');
		}
	};

	tabs.addTarget = function($target){
		this.$targets.append($target.hide());
	};

	tabs.render();

	$(function(){
		$("body").prepend(tabs.$el);
	});
})();