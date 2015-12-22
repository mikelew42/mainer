describe("super function", function(){
	var fn = utils.fn;

	it("should be defined", function(){
		expect(fn).toBeDefined();
	});

	it("should take a function as the single arg, and assign it to .main", function(){
		var test = fn(function(){});
		
		spyOn(test, "main");
		
		test();

		expect(test.main).toHaveBeenCalled();
	});

	it("should take an object as the second arg, and assign the properties to the fn", function(){
		var test = fn(function(){
			this.a();
		}, {
			a: function(){
				expect(true).toBe(true);
			}
		});
		test();
	});

	it("should allow overriding of any sub function", function(){
		var check = "", 
			test = fn(function(){
				this.a();
				this.b();
				this.c();
			}, {
				a: function(){ check += "a"; },
				b: function(){ check += "b"; },
				c: function(){ check += "c"; }
			});

		expect(check).toBe("");
		test();
		expect(check).toBe("abc");
		check = "";

		test.b = function(){ check += "b2" };
		test();
		expect(check).toBe("ab2c");
	});

	it("should allow overriding of the .main function", function(){
		var check = "", 
			test = fn(function(){
				this.a();
				this.b();
				this.c();
			}, {
				a: function(){ check += "a"; },
				b: function(){ check += "b"; },
				c: function(){ check += "c"; }
			});

		test.main = function(){
			this.b();
			this.c();
			this.a();
		};

		expect(check).toBe("");
		test();
		expect(check).toBe("bca");
	});

	it("should allow nesting and copying", function(){
		var check = "", 
			test = fn(function(){
				this.a();
				this.b();
				this.c();
			}, {
				a: function(){ check += "a, "; },
				b: fn(function(){
					check += "b.main, ";
					this.sub();
				}, {
					sub: function(){ check += "b.sub, "; }
				}),
				c: function(){ check += "c"; }
			});

		expect(check).toBe("");
		test();
		expect(check).toBe("a, b.main, b.sub, c");
		
		// copying
		var test2 = test.copy();

		test.b.sub = function(){ check += "b.sub2, " };
		check = "";
		test();
		expect(check).toBe("a, b.main, b.sub2, c");

		check = "";
		test2();
		expect(check).toBe("a, b.main, b.sub, c");
	});

});