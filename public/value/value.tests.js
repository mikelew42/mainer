$(function(){
	App.tabs.add({
		Value: $("<div>Value Tests</div>")
	});

	App.tabs.tabs.Value.activate();

	var Value = App.utils.Value.copy();

	var test1 = function(){
		var value = Value.copy();
		value(5);
		console.log(value());
		value.change.add({
			test: function(val){
				console.log(val);
				console.log(value());
			}
		});
		value(6);
	};
	// test1();

	var Mod = App.utils.mod.copy();

	var test2 = function(){
		var mod = Mod.copy();
		mod.someProp = Value.copy();
		mod.someProp.change.add({
			bleh: function(){
				console.log(mod.someProp());
			}
		});
		mod.someProp(7);
	};
	// test2();
});