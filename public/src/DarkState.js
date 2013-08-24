define([], function() {
	
	function DarkState(preload, switchToDark) {
		this.view = new createjs.Container();
		
		var eyelid = new createjs.Bitmap(preload.getResult("eyelid_top"));
		eyelid.y = -631;
		this.view.addChild(eyelid);
		this.eyelid = eyelid;
		
		this.main = new createjs.Container();
		this.main.visible = false;
		this.main.alpha = 0;
		this.view.addChild(this.main);

		var background = new createjs.Bitmap(preload.getResult("dark1"));
		background.x = -117;
		this.main.addChild(background);
	};
	
	DarkState.prototype.start = function() {
		this.main.visible = true;
		createjs.Tween.get(this.eyelid).to({y:0}, 200);
		createjs.Tween.get(this.main).to({alpha:1}, 300);
	}
	
	DarkState.prototype.update = function() {
	}
	
	DarkState.prototype.leftButton = function() {
	};
	
	DarkState.prototype.rightButton = function() {
	};
	
	DarkState.prototype.upButton = function() {
	};
	
	DarkState.prototype.downButton = function() {
	};
	
	DarkState.prototype.spaceButton = function() {
	}
	
	return DarkState;
});