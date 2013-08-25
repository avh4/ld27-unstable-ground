define([], function() {
	function ShoutBubble(delay, preload) {
		this.delay = delay;
		this.preload = preload;
		this.hasShouted = false;
		this.x = -64; this.y = 600-205-415 - 20;
	}
	
	ShoutBubble.prototype = new createjs.Bitmap();
	
	ShoutBubble.prototype.shout = function(s) {
		if (this.lastShout === s) return;
		this.alpha = 1;
		this.image = this.preload.getResult("bubble_" + s);
		createjs.Tween.removeTweens(this);
		createjs.Tween.get(this).wait(this.delay).to({alpha:0}, 500);
		this.lastShout = s;
		this.hasShouted = true;
	};
	
	return ShoutBubble;
});