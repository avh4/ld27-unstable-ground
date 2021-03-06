define([], function() {
	function Building4() {
		this.isDestroyed = false;
		this.x = 0;
		this.y = 0;
		this.startX = 60;
		this.dyns = 4;
	}
	
	Building4.prototype.yFor = function(where) {
		if (where == "L5") return 600-561;
		if (where == "L4") return 600-445;
		if (where == "L3") return 600-317;
		if (where == "L2") return 600-201;
		if (where == "INSIDE") return 600-67;
		else return 600-1;
	}
	
	Building4.prototype.imageFor = function(where) {
		if (this.fail) return this.fail;
		if (this.isDestroyed) return "b4d";
		if (where == "OUTSIDE") return "b4";
		return "b4i";
	};
	
	Building4.prototype.blast = function(dyns) {
		var a = false;
		var b = false;
		var c = false;
		var d = false;
		var x = false;
		dyns.forEach(function(dyn) {
			if (dyn.where == "INSIDE" && dyn.x >= 349 && dyn.x <= 469) a = true;
			if (dyn.where == "L2"     && dyn.x >= 349 && dyn.x <= 469) a = true;
			if (dyn.where == "INSIDE" && dyn.x >= 499 && dyn.x <= 599) b = true;
			if (dyn.where == "L2"     && dyn.x >= 499 && dyn.x <= 599) b = true;
			if (dyn.where == "L5"     && dyn.x >= 349 && dyn.x <= 469) c = true;
			if (dyn.where == "L5"     && dyn.x >= 499 && dyn.x <= 599) d = true;
			if (dyn.where != "OUTSIDE") x = true;
		});
		if (a && b && c && d) this.isDestroyed = true;
		else if (a && b) this.fail = "b4fb";
		else if (a) this.fail = "b4ffl";
		else if (b) this.fail = "b4ffr";
		else if (c) this.fail = "b4ftl";
		else if (c) this.fail = "b4ftr";
		else if (x) this.fail = "b4fi";
		else this.fail = "b4";
		console.log(this.fail);
	}
	
	Building4.prototype.maxX = function(where) {
		if (where == "L5") return 655;
		if (where == "L4") return 655;
		if (where == "L3") return 655;
		if (where == "L2") return 655;
		if (where == "INSIDE") return 655;
		return 800;
	}
	
	Building4.prototype.minX = function(where) {
		if (where == "L5") return 269;
		if (where == "L4") return 269;
		if (where == "L3") return 269;
		if (where == "L2") return 269;
		if (where == "INSIDE") return 269;
		return 0;
	}
	
	Building4.prototype.up = function(where, x) {
		if (where == "OUTSIDE" && x >= 460 && x <= 600) return "INSIDE";
		if (where == "INSIDE"  && x >= 403 && x <= 476) return "L2";
		if (where == "L2"      && x >= 403 && x <= 476) return "L3";
		if (where == "L3"      && x >= 403 && x <= 476) return "L4";
		if (where == "L4"      && x >= 403 && x <= 476) return "L5";
		return undefined;
	}
	
	Building4.prototype.down = function(where, x) {
		if (where == "INSIDE"  && x >= 460 && x <= 600) return "OUTSIDE";
		if (where == "L2"      && x >= 403 && x <= 476) return "INSIDE";
		if (where == "L3"      && x >= 403 && x <= 476) return "L2";
		if (where == "L4"      && x >= 403 && x <= 476) return "L3";
		if (where == "L5"      && x >= 403 && x <= 476) return "L4";
		return undefined;
	}
	
	return Building4;
});