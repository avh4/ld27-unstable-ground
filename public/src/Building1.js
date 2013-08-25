define([], function() {
	function Building1() {
		this.destroyed = false;
		this.x = 418 + 1;
		this.y = 200 + 2;
		this.startX = 400;
		this.tutorial = true;
		this.dyns = 1;
	}
	
	Building1.prototype.yFor = function(where) {
		if (where == "L2") return 600-261;
		if (where == "INSIDE") return 460;
		else return 515;
	}
	
	Building1.prototype.imageFor = function(where) {
		if (this.fail) return this.fail;
		if (this.destroyed) return "b1d";
		if (where == "OUTSIDE") return "b1";
		return "b1i";
	};
	
	Building1.prototype.blast = function(dyns) {
		if (dyns[0].x >= 560) {
			this.destroyed = true;
		} else {
			this.fail = "b1fl";
		}
	}
	
	Building1.prototype.maxX = function(where) {
		if (where == "OUTSIDE") return 800;
		if (where == "L2") return 710;
		return 660;
	}
	
	Building1.prototype.minX = function(where) {
		if (where == "OUTSIDE") return 0;
		return 470;
	}
	
	Building1.prototype.up = function(where, x) {
		if (where == "OUTSIDE" && x >= 590 && x <= 630) return "INSIDE";
		if (where == "INSIDE"  && x >= 650 && x <= 690) return "L2";
		return undefined;
	}
	
	Building1.prototype.down = function(where, x) {
		if (where == "INSIDE" && x >= 590 && x <= 630) return "OUTSIDE";
		if (where == "L2"     && x >= 650 && x <= 690) return "INSIDE";
		return undefined;
	}
	
	return Building1;
});