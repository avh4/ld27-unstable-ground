define(["Player", "Building1", "ShoutBubble"],
function(Player, Building1, ShoutBubble) {
	var safeMax = 3;
	
	function DemolitionState(preload, switchToDark) {
		this.p = new Player();
		this.b = new Building1();
		this.preload = preload;
		this.switchToDark = switchToDark;
		
		var view = this.view = new createjs.Container();

		var background = new createjs.Bitmap(preload.getResult("demolition"));
		view.addChild(background);
		
		var safeZone = this.safeZone = view.addChild(new createjs.Shape());
		safeZone.graphics.beginFill("green").drawRect(0, 500, 200, 30);

		b1 = view.addChild(new createjs.Bitmap());
		b1.x = 418 + 1; b1.y = 200 + 2;
		
		var dyn1 = this.dyn1 = view.addChild(new createjs.Shape());
		dyn1.graphics.beginFill("pink").drawRect(-15, -20, 30, 30);
		dyn1.graphics.beginFill("#000000").drawCircle(-1, -1, 3, 3);
		dyn1.isPlaced = false;
		
		var player = this.player = view.addChild(new createjs.Shape());
		player.graphics.beginFill("#ff0000").drawRect(-34/2, -60, 34, 60);
		player.graphics.beginFill("#000000").drawCircle(-1, -1, 3, 3);

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
		
		this.help1 = view.addChild(new createjs.Bitmap(preload.getResult("help1")));
		this.help1.setTransform(100, 600-259-111);
		this.help2 = view.addChild(new createjs.Bitmap(preload.getResult("help2")));
		this.help2.setTransform(470, 600-38-33);
		this.help3 = view.addChild(new createjs.Bitmap(preload.getResult("help3")));
		this.help3.setTransform(429, 600-38-33);
		this.help4 = view.addChild(new createjs.Bitmap(preload.getResult("help4")));
		this.help4.setTransform(25, 600-26-65);
		
		var bubble = this.bubble = new ShoutBubble(2000, preload);
		view.addChild(bubble);
	};
	
	DemolitionState.prototype.debug = function() {
		return "x: " + this.p.x + "  safeTime: " + this.safeTime.toFixed(1);
	};
	
	DemolitionState.prototype.start = function() {
		this.safeTime = safeMax;
		this.dyn1.visible = false;
		this.p.where = "OUTSIDE";
		this.p.x = 400;

		this.advanceHelpLevel(1);
	}
	
	DemolitionState.prototype.advanceHelpLevel = function(level) {
		if (this.helpLevel >= level) return;
		this.helpLevel = level;
		this.help1.visible = false;
		this.help2.visible = false;
		this.help3.visible = false;
		this.help4.visible = false;
		switch(level) {
			case 1: this.help1.visible = true; break;
			case 2: this.help2.visible = true; break;
			case 3: this.help3.visible = true; break;
			case 4: this.help4.visible = true; break;
		}
	}

	DemolitionState.prototype.update = function() {
		var player = this.player;
		var p = this.p;
		b1.image = this.preload.getResult(this.b.imageFor(p.where));
		
		if (p.x >= 560) this.advanceHelpLevel(2);
		if (p.where == "INSIDE") this.advanceHelpLevel(3);
		if (this.dyn1.isPlaced) this.advanceHelpLevel(4);
	
		if (!this.hasBlasted) {
			player.x = p.x;
			player.y = this.b.yFor(p.where);

			if (this.dyn1.isPlaced) {
				this.safeZone.visible = true;
				if (player.x <= 200) {
					this.safeTime -= 1/60;
					this.bubble.shout("clear");
				} else {
					this.safeTime = safeMax;
					if (this.bubble.hasShouted) this.bubble.shout("wait");
				}

				if (this.safeTime <= 0) {
					this.advanceHelpLevel(5);
					this.switchToDark();
				}
			} else {
				this.safeZone.visible = false;
			}
		} else {
			
		}
	};
	
	DemolitionState.prototype.blast = function() {
		this.hasBlasted = true;
		this.b.blast([this.dyn1]);
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
		this.dyn1.isPlaced = true;
	}
	
	return DemolitionState;
});