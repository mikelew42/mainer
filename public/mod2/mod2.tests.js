$(function(){
	var Logify = App.utils.Logify;

	App.tabs.add({
		Mod2: $("<div>Mod2 Tests</div>")
	});

	App.tabs.tabs.Mod2.activate();

	var Mod2 = App.utils.Mod2.copy();

	var test1 = function(){
		var mod = Mod2.copy();
		mod.set({
			test: function(a){ console.log('mod.test'); return a; },
			prop: 5
		});
		mod.test();
		mod.test(1, 'tw');

		mod.prop.change.add({
			test: function(val){
				console.log(mod.prop());
				console.log(val);
			}
		});
		mod.prop(7);
	};
	test1();

	var logifyTests = function(){
		var obj = {
			log: {
				fn: function(fnName, args){ console.group(fnName, args); console.groupCollapsed('innards'); },
				ret: function(ret){ console.groupEnd(); console.log('return', ret); console.groupEnd(); },
				i: function(){
					console.log('i: ', obj.i);
				}
			},
			test: function(){
				console.log('obj.test');
				return 5;
			},
			sum: function(a, b){
				return a + b;
			},
			ooLoop: function(){
				for (this.i = 0; this.i < 10; this.i ++)
					this.log.i();
			}
		};
		Logify(obj);
		obj.test('one', 2);
		obj.test('three', 4);
		obj.sum(5, 19);
		obj.ooLoop();
	};

	// logifyTests();

	var test2 = function(){

	};
	// test2();
});