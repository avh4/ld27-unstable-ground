define([], function() {
	function Building1() {
	}
	
	Building1.prototype.yFor = function(where) {
		if (where == "INSIDE") return 460;
		else return 515;
	}
	
	Building1.prototype.imageFor = function(where) {
		if (this.destroyed) return "b1d";
		if (where == "INSIDE") return "b1i";
		return "b1";
	};
	
	Building1.prototype.blast = function(dyns) {
		this.destroyed = true;
	}
	
	return Building1;
});