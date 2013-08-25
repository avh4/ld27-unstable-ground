define(["Player", "Building1", "ShoutBubble", "PlayerSprite"],
function(Player, Building1, ShoutBubble, PlayerSprite) {
	var safeMax = 3;
	
	function DemolitionState(building, preload, switchToDark, nextLevel, restart) {
		this.p = new Player();
		this.b = building;
		this.preload = preload;
		this.switchToDark = switchToDark;
		this.nextLevel = nextLevel;
		this.restart = restart;
		
		var view = this.view = new createjs.Container();

		var background = new createjs.Bitmap(preload.getResult("demolition"));
		view.addChild(background);
		
		var safeZone = this.safeZone = view.addChild(new createjs.Shape());
		safeZone.graphics.beginFill("green").drawRect(0, 500, 200, 30);

		b1 = view.addChild(new createjs.Bitmap());
		b1.x = building.x; b1.y = building.y;
		
		var dyns = this.dyns = [];
		for (var i = 0; i < building.dyns; i++) {
			var dyn = view.addChild(new createjs.Bitmap(preload.getResult("dyn")));
			dyn.regX = 14; dyn.regY = 23;
			dyn.isPlaced = false;
			dyns.push(dyn);
		}
		
		var player = this.player = view.addChild(new PlayerSprite(preload));

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
		
		this.talk = view.addChild(new createjs.Bitmap(preload.getResult("demolition_talk1")));
		this.talk.setTransform(67, 600-440-114);
		this.afterTalk = view.addChild(new createjs.Bitmap(preload.getResult("aftermath_talk1")));
		this.afterTalk.setTransform(197, 600-434-124);
		this.afterTalk.alpha = 0;
		
		this.help1 = view.addChild(new createjs.Bitmap(preload.getResult("help1")));
		this.help1.setTransform(100, 600-259-111);
		this.help2 = view.addChild(new createjs.Bitmap(preload.getResult("help2")));
		this.help2.setTransform(470, 600-38-33);
		this.help3 = view.addChild(new createjs.Bitmap(preload.getResult("help3")));
		this.help3.setTransform(429, 600-38-33);
		this.help4 = view.addChild(new createjs.Bitmap(preload.getResult("help4")));
		this.help4.setTransform(25, 600-26-65);
		this.help5 = view.addChild(new createjs.Bitmap(preload.getResult("help5")));
		this.help5.setTransform(220, 600-38-33);
		this.help8 = view.addChild(new createjs.Bitmap(preload.getResult("help8")));
		this.help8.setTransform(76, 600-254-73);
		this.help8.visible = false;
		this.help9 = view.addChild(new createjs.Bitmap(preload.getResult("help9")));
		this.help9.setTransform(145, 600-489);
		this.help9.visible = false;
		
		var bubble = this.bubble = new ShoutBubble(1500, preload);
		view.addChild(bubble);
	};
	
	DemolitionState.prototype.debug = function() {
		return "x: " + this.p.x + "  safeTime: " + this.safeTime.toFixed(1);
	};
	
	DemolitionState.prototype.start = function() {
		this.safeTime = safeMax;
		this.p.where = "OUTSIDE";
		this.p.x = this.b.startX;
		
		var i = 0;
		this.dyns.forEach(function(dyn) {
			dyn.x = 30 + i*40;
			dyn.y = 30;
			i++;
		});
		
		this.talk.alpha = 0;
		createjs.Tween.get(this.talk).to({alpha: 1}, 3000).to({alpha:0}, 3000);
		
		this.help1.alpha = 0;
		createjs.Tween.get(this.help1).wait(4000).to({alpha:1}, 500);
		this.help5.alpha = 0;
		createjs.Tween.get(this.help5).wait(6000).to({alpha:1}, 500);

		this.advanceHelpLevel(1);
	}
	
	DemolitionState.prototype.advanceHelpLevel = function(level) {
		if (this.helpLevel >= level) return;
		this.helpLevel = level;
		this.help1.visible = false;
		this.help2.visible = false;
		this.help3.visible = false;
		this.help4.visible = false;
		this.help5.visible = false;
		if (!this.b.tutorial) return;
		switch(level) {
			case 1: this.help1.visible = this.help5.visible = true; break;
			case 2: this.help2.visible = true; break;
			case 3: this.help3.visible = true; break;
			case 4: this.help4.visible = true; break;
			case 5: this.help8.visible = true; break;
		}
	}

	DemolitionState.prototype.update = function() {
		var player = this.player;
		var p = this.p;
		b1.image = this.preload.getResult(this.b.imageFor(p.where));
		
		if (p.x >= 560) this.advanceHelpLevel(2);
		if (p.where == "INSIDE") this.advanceHelpLevel(3);
		var allDynsPlaced = true;
		this.dyns.forEach(function(dyn) {
			if (!dyn.isPlaced) allDynsPlaced = false;
		});
		if (allDynsPlaced) this.advanceHelpLevel(4);
	
		if (!this.hasBlasted) {
			player.x = p.x;
			player.y = this.b.yFor(p.where);

			if (allDynsPlaced) {
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
		this.b.blast(this.dyns);
		this.smokes.forEach(function (s) {
			s.visible = true;
			s.alpha = 1;
			s.scaleX = s.scaleY = 1;
			createjs.Tween.get(s).to({alpha:0, scaleX:1.4, scaleY:1.2}, 20000);
		});
		
		this.dyns.forEach(function(dyn) {
			dyn.visible = false;
		});

		if (this.b.isDestroyed) {
			this.help8.visible = true;
			this.help8.alpha = 0;
			createjs.Tween.get(this.help8).wait(2000+3000).to({alpha:1}, 500);
			createjs.Tween.get(this.afterTalk).wait(2000).to({alpha:1}, 4000).to({alpha:0}, 4000);
		} else {
			this.advanceHelpLevel(6);
			this.help9.visible = true;
			this.help9.alpha = 0;
			createjs.Tween.get(this.help9).wait(2000).to({alpha:1}, 500);
		}
	};
	
	DemolitionState.prototype.leftButton = function() {
		this.p.x -= 10;
		var min = this.b.minX(this.p.where);
		if (this.p.x < min) this.p.x = min;
	};
	
	DemolitionState.prototype.rightButton = function() {
		this.p.x += 10;
		var max = this.b.maxX(this.p.where);
		if (this.p.x > max) this.p.x = max;
	};
	
	DemolitionState.prototype.upButton = function() {
		var to = this.b.up(this.p.where, this.p.x);
		if (to) this.p.where = to;
	};
	
	DemolitionState.prototype.downButton = function() {
		var to = this.b.down(this.p.where, this.p.x);
		if (to) this.p.where = to;
	};
	
	DemolitionState.prototype.spaceButton = function() {
		if (!this.hasBlasted) {
			for(var i = 0; i < this.dyns.length; i++) {
				var dyn = this.dyns[i];
				if (!dyn.isPlaced) {
					dyn.setTransform(this.player.x - dyn.regX, this.player.y - dyn.regY - 30);
					dyn.where = this.p.where;
					dyn.visible = true;
					dyn.isPlaced = true;
					break;
				}
			}
		} else {
			if (this.b.isDestroyed) {
				this.nextLevel();
			} else {
				this.restart();
			}
		}
	}
	
	return DemolitionState;
});