define(["Player", "Building1"],
function(Player, Building1) {
	
	function DemolitionState(preload, switchToDark) {
		this.p = new Player();
		this.b = new Building1();
		this.preload = preload;
		this.switchToDark = switchToDark;
		
		var view = this.view = new createjs.Container();

		var background = new createjs.Bitmap(preload.getResult("demolition"));
		this.view.addChild(background);
		
		var safeZone = new createjs.Shape();
		safeZone.graphics.beginFill("green").drawRect(0, 500, 200, 30);
		this.view.addChild(safeZone);

		b1 = new createjs.Bitmap();
		b1.x = 418 + 1; b1.y = 200 + 2;
		this.view.addChild(b1);
		
		var dyn1 = new createjs.Shape();
		dyn1.graphics.beginFill("pink").drawRect(-15, -20, 30, 30);
		dyn1.graphics.beginFill("#000000").drawCircle(-1, -1, 3, 3);
		this.view.addChild(dyn1);
		this.dyn1 = dyn1;
		
		var player = new createjs.Shape();
		player.graphics.beginFill("#ff0000").drawRect(-34/2, -60, 34, 60);
		player.graphics.beginFill("#000000").drawCircle(-1, -1, 3, 3);
		this.view.addChild(player);
		this.player = player;

		var smokes = this.smokes = [];
		function addSmoke(img, x, y) {
			var s = new createjs.Bitmap(preload.getResult(img));
			s.regX = 392; s.regY = 600-82;
			s.x = s.regX + x; s.y = s.regY + y;
			s.visible = false;
			smokes.push(s);
			view.addChild(s);
		}
		addSmoke("smoke1", 590, 600-256);
		addSmoke("smoke2", 324, 600-231);		
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
		player.y = this.b.yFor(p.where);

		b1.image = this.preload.getResult(this.b.imageFor(p.where));
		
		if (player.x <= 200) {
			this.safeTime -= 1;
		};
		if (this.safeTime <= 0) {
			this.switchToDark();
			this.safeTime = 60*3;
		}
	};
	
	DemolitionState.prototype.blast = function() {
		this.b.blast(this.dyn1);
		this.smokes.forEach(function (s) {
			s.visible = true;
			s.alpha = 1;
			s.scaleX = s.scaleY = 1;
			createjs.Tween.get(s).to({alpha:0, scaleX:1.4, scaleY:1.2}, 20000);
		});
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