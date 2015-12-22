describe("utils.copy", function(){
	var copy = utils.copy;
	it("should be defined", function(){
		expect(copy).toBeDefined();
	});

	it("should return simple values", function(){
		expect(copy(5)).toBe(5);
		expect(copy("str")).toBe("str");
		expect(copy({})).toEqual({});
		expect(copy([])).toEqual([]);
		var fn = function(){};
		expect(copy(fn)).toBe(fn);
		var Mod = function(){
			var mod = function(){};
			mod.Base = Mod;
			return mod;
		};

		var mod = Mod();
		var modCopy = copy(mod);
		expect(mod.Base).toBe(Mod);
		expect(modCopy.Base).toBe(Mod);
		expect(modCopy).not.toEqual(mod);
		expect(modCopy).not.toBe(mod);
	});

	it("should copy objects and arrays", function(){
		expect(copy({ one: 1, two: "two" })).toEqual({ one: 1, two: "two" });
		expect(copy([1, "two", 3])).toEqual([1, "two", 3]);
	});

	describe("utils.copy.oo", function(){
		var mod = { copy: copy.oo };
		it("should be defined", function(){
			expect(mod.copy).toBeDefined();
		});
		it("should copy itself", function(){
			mod.prop = 5;
			mod.str = "str";
			mod.obj = {};
			var cmod = mod.copy();
			expect(cmod).toEqual(mod);
			expect(cmod).not.toBe(mod);
			expect(cmod.obj).not.toBe(mod.obj);
		});
	});
});

