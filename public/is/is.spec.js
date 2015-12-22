describe("is", function(){
	var is = utils.is;
	describe("arr", function(){
		it("should identify an array", function(){
			expect(is.arr([])).toBe(true);
			expect(is.arr({})).toBe(false);
		});
	});

	describe("obj", function(){
		it("should identify an object", function(){
			expect(is.obj({})).toBe(true);
			expect(is.obj([])).toBe(false);
			expect(is.obj(function(){})).toBe(false);
		});
	});

	describe("fn", function(){
		it("should identify a function", function(){
			expect(is.fn(function(){})).toBe(true);
			expect(is.fn({})).toBe(false);
		});
	});

	describe("val", function(){
		it("should identify a bool, num, or string", function(){
			expect(is.val(true)).toBe(true);
			expect(is.val(false)).toBe(true);
			expect(is.val(3)).toBe(true);
			expect(is.val("yep")).toBe(true);
			expect(is.val({})).toBe(false);
			expect(is.val([])).toBe(false);
			expect(is.val(function(){})).toBe(false);
		});
	});

});