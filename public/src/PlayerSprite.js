define([], function() {
	function PlayerSprite(preload) {
		this.image = preload.getResult("player");
		this.regX = 15; this.regY = 60-1;
	}
	
	PlayerSprite.prototype = new createjs.Bitmap();
	
	return PlayerSprite;
});

