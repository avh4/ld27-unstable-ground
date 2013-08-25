define([], function() {
	function Building3() {
		this.destroyed = false;
		this.x = 0;
		this.y = 0;
		this.startX = 200;
		this.dyns = 2;
	}
	
	Building3.prototype.yFor = function(where) {
		if (where == "L3") return 600-366;
		if (where == "L2") return 600-192;
		if (where == "INSIDE") return 515;
		else return 555;
	}
	
	Building3.prototype.imageFor = function(where) {
		if (this.fail) return this.fail;
		// if (this.destroyed) return "b3d";
		// if (where == "L3") return "b2i";
		// if (where == "L2") return "b2i";
		// if (where == "INSIDE") return "b2i";
		return "b3";
	};
	
	Building3.prototype.blast = function(dyns) {
		// if (dyns[0].x >= 560) {
		// 	this.destroyed = true;
		// } else {
			// this.fail = "b2f";
		// }
	}
	
	Building3.prototype.maxX = function(where) {
		if (where == "L3") return 640;
		if (where == "L2") return 640;
		if (where == "INSIDE") return 640;
		return 800;
	}
	
	Building3.prototype.minX = function(where) {
		if (where == "L3") return 370;
		if (where == "L2") return 370;
		if (where == "INSIDE") return 370;
		return 0;
	}
	
	Building3.prototype.up = function(where, x) {
		if (where == "OUTSIDE" && x >= 570 && x <= 600) return "INSIDE";
		// if (where == "OUTSIDE" && x >= 595 && x <= 706) return "INSIDE";
		// if (where == "INSIDE"  && x >= 351 && x <= 420) return "L2";
		// if (where == "L2"      && x >= 525 && x <= 674) return "L3";
		return undefined;
	}
	
	Building3.prototype.down = function(where, x) {
		if (where == "INSIDE" && x >= 570 && x <= 600) return "OUTSIDE";
		// if (where == "INSIDE" && x >= 595 && x <= 706) return "OUTSIDE";
		// if (where == "L2"     && x >= 351 && x <= 420) return "INSIDE";
		// if (where == "L3"     && x >= 525 && x <= 674) return "L2";
		return undefined;
	}
	
	return Building3;
});