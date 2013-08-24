define([], function() {
	function Building1() {
		this.destroyed = false;
	}
	
	Building1.prototype.yFor = function(where) {
		if (where == "INSIDE") return 460;
		else return 515;
	}
	
	Building1.prototype.imageFor = function(where) {
		if (this.fail) return this.fail;
		if (this.destroyed) return "b1d";
		if (where == "INSIDE") return "b1i";
		return "b1";
	};
	
	Building1.prototype.blast = function(dyns) {
		if (dyns[0].x >= 560) {
			this.destroyed = true;
		} else {
			this.fail = "b1fl";
		}
	}
	
	return Building1;
});