$(function(){
	App.tabs.add({
		Q: $("<div>Q Tests</div>")
	});

	App.tabs.tabs.Q.activate();

	var Q = App.utils.Q.copy();

	var test1 = function(){
		var q = Q.copy();
		q.add({
			one: function(){ console.log('one'); },
			two: function(){ console.log('two') }
		})
		q.add({
			one: function(){ console.log('1'); }
		})
		q.exec();
	};
	// test1();

	var Mod = App.utils.mod.copy();

	var test2 = function(){
		var mod = Mod.copy();
		mod.event = Q.copy();
		mod.event.ctx = mod;
		mod.poop = function(){ console.log('poo')};
		mod.event.add({ 
			one: function(){
				this.poop();
			} 
		});

		mod.event.exec();
	};
	// test2();
});