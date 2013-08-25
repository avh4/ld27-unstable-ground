define([], function() {
	function Building2() {
		this.isDestroyed = false;
		this.x = 226;
		this.y = 600-45-477;
		this.startX = 200;
		this.dyns = 2;
	}
	
	Building2.prototype.yFor = function(where) {
		if (where == "L3") return 600-366;
		if (where == "L2") return 600-192;
		if (where == "INSIDE") return 515;
		else return 555;
	}
	
	Building2.prototype.imageFor = function(where) {
		if (this.fail) return this.fail;
		if (this.isDestroyed) return "b2d";
		if (where == "L3") return "b2i";
		if (where == "L2") return "b2i";
		if (where == "INSIDE") return "b2i";
		return "b2";
	};
	
	Building2.prototype.blast = function(dyns) {
		var a = false;
		var b = false;
		dyns.forEach(function(dyn) {
			if (dyn.where == "INSIDE" && dyn.x >= 420 && dyn.x <= 500) a = true;
			if (dyn.where == "L2"     && dyn.x >= 420 && dyn.x <= 500) a = true;
			if (dyn.where == "INSIDE" && dyn.x >= 550 && dyn.x <= 620) b = true;
			if (dyn.where == "L2"     && dyn.x >= 550 && dyn.x <= 620) b = true;
		});
		if (a && b) this.isDestroyed = true;
		else if (a) this.fail = "b2fl";
		else if (b) this.fail = "b2fr";
		else this.fail = "b2fbc";
	}
	
	Building2.prototype.maxX = function(where) {
		if (where == "L3") return 640;
		if (where == "L2") return 640;
		if (where == "INSIDE") return 640;
		return 800;
	}
	
	Building2.prototype.minX = function(where) {
		if (where == "L3") return 370;
		if (where == "L2") return 370;
		if (where == "INSIDE") return 370;
		return 0;
	}
	
	Building2.prototype.up = function(where, x) {
		if (where == "OUTSIDE" && x >= 416 && x <= 524) return "INSIDE";
		if (where == "OUTSIDE" && x >= 595 && x <= 706) return "INSIDE";
		if (where == "INSIDE"  && x >= 351 && x <= 420) return "L2";
		if (where == "L2"      && x >= 525 && x <= 674) return "L3";
		return undefined;
	}
	
	Building2.prototype.down = function(where, x) {
		if (where == "INSIDE" && x >= 416 && x <= 524) return "OUTSIDE";
		if (where == "INSIDE" && x >= 595 && x <= 706) return "OUTSIDE";
		if (where == "L2"     && x >= 351 && x <= 420) return "INSIDE";
		if (where == "L3"     && x >= 525 && x <= 674) return "L2";
		return undefined;
	}
	
	return Building2;
});