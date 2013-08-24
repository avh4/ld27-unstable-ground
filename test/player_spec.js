var Player = require('Player');

describe('Player', function() {
	var subject;
	
	beforeEach(function() {
		subject = new Player();
	});
	
	it("should start at 400", function() {
		expect(subject.x).toBe(400);
	});
	
	it("should start outside", function() {
		expect(subject.where).toBe("OUTSIDE");
	});
	
	describe("moving right", function() {
		it("should advance by 10", function() {
			subject.rightButton();
			expect(subject.x).toBe(410);
		});
		
		it("should not advance off the screen", function() {
			for(var i = 0; i < 800; i++) {
				subject.rightButton();
			}
			expect(subject.x).toBe(800);
		});
	});
	
	describe("moving left", function() {
		it("should advance by 10", function() {
			subject.leftButton();
			expect(subject.x).toBe(390);
		});

		it("should not advance off the screen", function() {
			for(var i = 0; i < 800; i++) { subject.leftButton(); }
			expect(subject.x).toBe(0);
		});
	});
	
	describe("entering a building", function() {
		describe("when in front of the building", function() {
			it("should be inside", function() {
				subject.x = 590;
				subject.upButton();
				expect(subject.where).toBe("INSIDE");
			});
		});
		
		describe("when not in front of the build", function() {
			it("should still be outside", function() {
				subject.upButton();
				expect(subject.where).toBe("OUTSIDE");
			});
		});
	});
	
	describe("in the building", function() {
		beforeEach(function() {
			subject.x = 590;
			subject.where = "INSIDE";
		});
		
		it("should not go through the left wall", function() {
			for(var i = 0; i < 800; i++) { subject.leftButton(); }
			expect(subject.x).toBe(470);
		});
		
		it("should not go through the right wall", function() {
			for(var i = 0; i < 800; i++) { subject.rightButton(); }
			expect(subject.x).toBe(640);
		});
	});
	
	describe("exiting the building", function() {
		beforeEach(function() {
			subject.where = "INSIDE";
		});
		
		describe("when at the exit", function() {
			it("should be outside", function() {
				subject.x = 590;
				subject.downButton();
				expect(subject.where).toBe("OUTSIDE");
			});
		});
		describe("when not at the exit", function() {
			it("should stay inside", function() {
				subject.x = 500;
				subject.downButton();
				expect(subject.where).toBe("INSIDE");
			});
		});
	});
});