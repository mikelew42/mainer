;(function(){
	window.App = utils.mod.copy();

	App.install(utils.coll);
	
	App.render = function(){
		this.$el = $("<div></div>").addClass('app');
		this.$el.append("<h3>App</h3>");
		this.renderChildren();
		return this.$el;
	};
	App.renderChildren = function(){
		var app = this;
		this.$children = $("<div></div>").addClass('children');
		this.each(function(){
			app.$children.append(this.render());
		});
		this.$children.appendTo(this.$el);
	};
	$(function(){
		$("body").append(App.render());
		log({ app: App });
	});

})();