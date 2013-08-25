define(["ShoutBubble", "PlayerSprite"],
function(ShoutBubble, PlayerSprite) {
	
	function DarkState(dl, dyns, preload, blast, dead) {
		var th = this;
		this.music = "dark";
		this.alphaThreshold = 1;
		this.t = 0;
		this.blast = blast;
		this.dyns = dyns;
		this.dead = dead;
		var view = this.view = new createjs.Container();
		
		var eyelid = new createjs.Bitmap(preload.getResult("eyelid_top"));
		eyelid.y = -631;
		this.view.addChild(eyelid);
		this.eyelid = eyelid;
		
		var main = this.main = view.addChild(new createjs.Container());
		main.visible = false;
		main.alpha = 0;

		this.clouds = [];
		function addCloud(img, x, y, vx) {
			var c = new createjs.Bitmap(preload.getResult(img));
			c.x = x; c.y = y;
			c.vx = vx;
			th.clouds.push(c);
			main.addChild(c);
		}
		addCloud("c2", -117, 600-255-278, 5);
		addCloud("c4", -227, 600- 96-265, 10);
		
		var l = this.l = main.addChild(new createjs.Bitmap(preload.getResult(dl)));
		l.x = -8000+800; l.y = 0;
		l.vx = 10;
		this.hitBitmap = new createjs.Bitmap(preload.getResult(dl));
		
		var flash = this.flash = main.addChild(new createjs.Container());
		flash.visible = false;
		var flashWhite = this.flashWhite = main.addChild(new createjs.Shape());
		flashWhite.graphics.beginFill("white").drawRect(0, 0, 800, 600);
		flashWhite.visible = false;
		dyns.forEach(function(dyn) {
			var f = flash.addChild(new createjs.Bitmap(preload.getResult("flash")));
			f.setTransform(dyn.x - 242/2, dyn.y - 238/2);
		});
		
		var player = this.player = main.addChild(new PlayerSprite(preload));
		player.x = 700; player.y = 300;
		player.vy = 0;

		addCloud("c1",  237, 0, 15);
		addCloud("c5",  153, 600- 60-102, 15);
		addCloud("c3",   88, 600-170-277, 20);
		
		this.bubble = this.view.addChild(new ShoutBubble(200, preload));
	};
	
	DarkState.prototype.debug = function() {
		return "T: " + Math.round(this.t * 10) / 10;
	}
	
	DarkState.prototype.start = function() {
		this.main.visible = true;
		this.player.dx = 0;
		this.player.y = this.nearestGround(this.player.x - this.l.x, 0);
		createjs.Tween.get(this.eyelid).to({y:0}, 200);
		createjs.Tween.get(this.main).to({alpha:1}, 300);
	}
	
	DarkState.prototype.update = function() {
		this.clouds.forEach(function (c) {
			c.x += c.vx;
			if (c.x > 800) c.x = -800;
		});
		this.l.x += this.l.vx;
		
		this.t += 1/60;
		var dx = Math.sin(this.t*60/3.5) - 0.5;
		dx *= (dx < 0) ? 8 : 16;
		this.player.baseX = 700 - (600 * this.t/12);
		this.player.x = this.player.baseX + ((this.player.vy == 0) ? dx : 0) + this.player.dx;
		if (this.player.x > 790) {
			this.player.dx -= (this.player.x - 790);
			this.player.x = 790;
		}
		if (this.player.x < 10) {
			this.player.dx += (10 - this.player.x);
			this.player.x = 10;
		}
		var open = this.nearestOpen(-this.l.x, this.player.x, this.player.y);
		if (open != Math.floor(this.player.x)) {
			this.player.dx -= Math.floor(this.player.x - open);
			this.player.x = open;
		}
		if (this.player.x > 790) {
			// this.dead();
			console.log("DEAD");
		}
		
		var hitX = this.player.x - this.l.x;
		groundY = this.nearestGround(hitX, this.player.y)
		
		this.player.vy += 1;
		this.player.y += this.player.vy;
		if (this.player.y > groundY) {
			this.player.vy = 0;
			this.player.y = groundY;
		}
		
		var s = 10 - Math.floor(this.t);
		if (s > 0) this.bubble.shout(s);
		
		if (this.t > 10 && !this.hasFlashed) {
			this.flash.visible = true;
			createjs.Tween.get(this.flash).to({alpha:.4}, 100).to({alpha:0}, 1200);
			this.flashWhite.visible = true;
			createjs.Tween.get(this.flashWhite).to({alpha:.3}, 50).to({alpha:0}, 1500);
			this.hasFlashed = true;
		}
		
		if (this.t > 12) {
			this.blast();
			createjs.Tween.get(this.eyelid).to({y:-631}, 400);
			createjs.Tween.get(this.main).to({alpha:0}, 300);
		}
	}
	
	DarkState.prototype.leftButton = function() {
		this.player.dx -= 10;
	};
	
	DarkState.prototype.rightButton = function() {
		this.player.dx += 10;
	};
	
	DarkState.prototype.upButton = function() {
	};
	
	DarkState.prototype.downButton = function() {
	};
	
	DarkState.prototype.spaceButton = function() {
		if (this.player.vy == 0) this.player.vy = -20;
	}
	
	DarkState.prototype.nearestGround = function(x, y) {
		this.hitBitmap.cache(x, 0, 1, 600);
		var hitData = this.hitBitmap.cacheCanvas.getContext('2d').getImageData(0, 0, 1, 600);
		var groundY = y;
		while (hitData.data[groundY*4+3] < this.alphaThreshold && groundY < 600) {
			groundY++;
		}
		while (hitData.data[groundY*4+3] >= this.alphaThreshold && groundY > 0) {
			groundY--;
			if (groundY - y < -10) break;
		}
		return groundY;
	}
	
	DarkState.prototype.nearestOpen = function(leftX, dx, y) {
		this.hitBitmap.cache(leftX, y, 800, 1);
		var hitData = this.hitBitmap.cacheCanvas.getContext('2d').getImageData(0, 0, 800, 1);
		dx = Math.floor(dx);
		
		// If this space is open, use it
		if (hitData.data[dx*4+3] < this.alphaThreshold) return dx;
		
		// Find if we're on the left or right of a wall
		var leftWallDX = dx;
		while (hitData.data[leftWallDX*4+3] >= this.alphaThreshold && leftWallDX >= 0) {
			leftWallDX--;
		}
		var rightWallDX = dx;
		while (hitData.data[rightWallDX*4+3] >= this.alphaThreshold && rightWallDX < 800) {
			rightWallDX++;
		}
		var closest = (dx - leftWallDX) >= (rightWallDX - dx)  ? leftWallDX : rightWallDX;
		return rightWallDX;
	}
	
	
	return DarkState;
});