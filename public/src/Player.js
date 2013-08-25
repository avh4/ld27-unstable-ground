define([], function() {
	function Player() {
		this.x = 400;
		this.where = "OUTSIDE";
	}
	
	Player.prototype.rightButton = function() {
		this.x += 10;
		if (this.where == "OUTSIDE" && this.x > 800) this.x = 800;
		if (this.where == "INSIDE" && this.x > 640) this.x = 640;
	};
	
	Player.prototype.leftButton = function() {
		this.x -= 10;
		if (this.where == "OUTSIDE" && this.x < 0) this.x = 0;
		if (this.where == "INSIDE" && this.x < 470) this.x = 470;
	};
	
	Player.prototype.upButton = function() {
		if (this.x >= 590 && this.x <= 630) this.where = "INSIDE";
	};
	
	Player.prototype.downButton = function() {
		if (this.x >= 590 && this.x <= 630) this.where = "OUTSIDE";
	};
	
	return Player;
});