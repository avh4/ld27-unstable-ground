var Building2 = require('Building2');

describe('Building2', function() {
	var subject;
	
	beforeEach(function() {
		subject = new Building2();
	});
	
	describe("blasting in the center", function() {
		it("should destroy the building", function() {
			subject.blast([{x: 600}]);
			expect(subject.isDestroyed).toBe(true);
			expect(subject.imageFor("OUTSIDE")).toBe("b1d");
		});
	});
	
	describe("blasting to the left", function() {
		it("should fail", function() {
			subject.blast([{x: 559}]);
			expect(subject.isDestroyed).toBe(false);
			expect(subject.imageFor("OUTSIDE")).toBe("b1fl");
		});
	});
});