define(["Player"], function(Player) {
	
	function DemolitionState(preload, switchToDark) {
		this.p = new Player();
		this.switchToDark = switchToDark;
		
		this.view = new createjs.Container();

		var background = new createjs.Bitmap(preload.getResult("demolition"));
		this.view.addChild(background);
		
		var safeZone = new createjs.Shape();
		safeZone.graphics.beginFill("green").drawRect(0, 500, 200, 30);
		this.view.addChild(safeZone);

		b1i = new createjs.Bitmap(preload.getResult("b1i"));
		b1i.x = 418; b1i.y = 200;
		this.view.addChild(b1i);
		
		var dyn1 = new createjs.Shape();
		dyn1.graphics.beginFill("pink").drawRect(-15, -20, 30, 30);
		dyn1.graphics.beginFill("#000000").drawCircle(-1, -1, 3, 3);
		this.view.addChild(dyn1);
		this.dyn1 = dyn1;
		
		b1 = new createjs.Bitmap(preload.getResult("b1"));
		b1.x = 418 + 1; b1.y = 200 + 2;
		this.view.addChild(b1);
		
		var player = new createjs.Shape();
		player.graphics.beginFill("#ff0000").drawRect(-34/2, -60, 34, 60);
		player.graphics.beginFill("#000000").drawCircle(-1, -1, 3, 3);
		this.view.addChild(player);
		this.player = player;
	};
	
	DemolitionState.prototype.debug = function() {
		return "x: " + this.p.x;
	};
	
	DemolitionState.prototype.start = function() {
		this.safeTime = 60*3;
		this.dyn1.visible = false;
		this.p.where = "OUTSIDE";
		this.p.x = 400;
	}
	
	DemolitionState.prototype.update = function() {
		var player = this.player;
		var p = this.p;
		player.x = p.x;
		if (p.where == "INSIDE") {
			b1.visible = false;
			player.y = 460;
		} else {
			b1.visible = true;
			player.y = 515;
		}
		if (player.x <= 200) {
			this.safeTime -= 1;
		};
		if (this.safeTime <= 0) {
			this.switchToDark();
			this.safeTime = 60*3;
		}
	};
	
	DemolitionState.prototype.leftButton = function() {
		this.p.leftButton();
	};
	
	DemolitionState.prototype.rightButton = function() {
		this.p.rightButton();
	};
	
	DemolitionState.prototype.upButton = function() {
		this.p.upButton();
	};
	
	DemolitionState.prototype.downButton = function() {
		this.p.downButton();
	};
	
	DemolitionState.prototype.spaceButton = function() {
		this.dyn1.x = this.player.x; this.dyn1.y = this.player.y;
		this.dyn1.visible = true;
	}
	
	return DemolitionState;
});