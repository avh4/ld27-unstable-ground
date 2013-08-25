define([], function() {
	function Building3() {
		this.isDestroyed = false;
		this.x = 0;
		this.y = 0;
		this.startX = 200;
		this.dyns = 2;
	}
	
	Building3.prototype.yFor = function(where) {
		if (where == "L5") return 600-459;
		if (where == "L4") return 600-361;
		if (where == "L3") return 600-259;
		if (where == "L2") return 600-161;
		if (where == "INSIDE") return 600-71;
		else return 560;
	}
	
	Building3.prototype.imageFor = function(where) {
		if (this.fail) return this.fail;
		// if (this.isDestroyed) return "b3d";
		if (where == "OUTSIDE") return "b3";
		return "b3i";
	};
	
	Building3.prototype.blast = function(dyns) {
		var a = false;
		var b = false;
		var tl = false;
		var tr = false;
		var d = false;
		dyns.forEach(function(dyn) {
			if (dyn.where == "L2"     && dyn.x >= 385 && dyn.x <= 488) tl = a = true;
			if (dyn.where == "L2"     && dyn.x >= 488 && dyn.x <= 608) tr = b = true;
			if (dyn.where == "INSIDE" && dyn.x >= 488) tr = true;
			if (dyn.where == "INSIDE") tl = true;
			if (dyn.where != "OUTSIDE") d = true;
		});
		if (a && b) this.isDestroyed = true;
		else if (tr) this.fail = "b3ftr";
		else if (tl) this.fail = "b3ftl";
		else if (d) this.fail = "b3ft";
		else this.fail = "b3";
		console.log(this.fail);
	}
	
	Building3.prototype.maxX = function(where) {
		if (where == "L5") return 610;
		if (where == "L4") return 590;
		if (where == "L3") return 590;
		if (where == "L2") return 590;
		if (where == "INSIDE") return 590;
		return 800;
	}
	
	Building3.prototype.minX = function(where) {
		if (where == "L5") return 384;
		if (where == "L4") return 408;
		if (where == "L3") return 408;
		if (where == "L2") return 408;
		if (where == "INSIDE") return 408;
		return 0;
	}
	
	Building3.prototype.up = function(where, x) {
		if (where == "OUTSIDE" && x >= 570 && x <= 600) return "INSIDE";
		if (where == "INSIDE"  && x >= 390 && x <= 430) return "L2";
		if (where == "L2"      && x >= 390 && x <= 430) return "L3";
		if (where == "L3"      && x >= 390 && x <= 430) return "L4";
		if (where == "L4"      && x >= 390 && x <= 430) return "L5";
		return undefined;
	}
	
	Building3.prototype.down = function(where, x) {
		if (where == "INSIDE"  && x >= 570 && x <= 600) return "OUTSIDE";
		if (where == "L2"      && x >= 390 && x <= 430) return "INSIDE";
		if (where == "L3"      && x >= 390 && x <= 430) return "L2";
		if (where == "L4"      && x >= 390 && x <= 430) return "L3";
		if (where == "L5"      && x >= 390 && x <= 430) return "L4";
		return undefined;
	}
	
	return Building3;
});