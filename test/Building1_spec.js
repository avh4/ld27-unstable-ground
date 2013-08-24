var Building1 = require('Building1');

describe('Building1', function() {
	var subject;
	
	beforeEach(function() {
		subject = new Building1();
	});
	
	describe("blasting in the center", function() {
		it("should destroy the building", function() {
			subject.blast([{x: 600}]);
			expect(subject.destroyed).toBe(true);
			expect(subject.imageFor("OUTSIDE")).toBe("b1d");
		});
	});
	
	describe("blasting to the left", function() {
		it("should fail", function() {
			subject.blast([{x: 559}]);
			expect(subject.destroyed).toBe(false);
			expect(subject.imageFor("OUTSIDE")).toBe("b1fl");
		});
	});
});