;(function(){
	
	var utils = window.utils = window.utils || {},
		is = utils.is,
		mod = utils.mod;

	// utils.tabs.add({ test: $("<h1>yo</h1>")});

	var ItemView = mod.copy();
	ItemView.render = function(){

	};



	App.add({
		// test2: {
		// 	render: function(){
		// 		return $("<h1>Yo, this is a "+ this._name +"</h1>");
		// 	}
		// },
		test3: viewer(3),
		objTest: viewer({ 
			prop: 1, 
			anotherProp: "str",
			objProp: {
				one: 1,
				two: "two"
			}
		}),
		utils: viewer(utils)
	});


})();