define([], function() {
	
	function DarkState(preload, switchToDark) {
		var th = this;
		this.t = 0;
		this.view = new createjs.Container();
		
		var eyelid = new createjs.Bitmap(preload.getResult("eyelid_top"));
		eyelid.y = -631;
		this.view.addChild(eyelid);
		this.eyelid = eyelid;
		
		this.main = new createjs.Container();
		this.main.visible = false;
		this.main.alpha = 0;
		this.view.addChild(this.main);

		this.clouds = [];
		function addCloud(img, x, y, vx) {
			var c = new createjs.Bitmap(preload.getResult(img));
			c.x = x; c.y = y;
			c.vx = vx;
			th.clouds.push(c);
			th.main.addChild(c);
		}
		addCloud("c2", -117, 600-255-278, 5);
		addCloud("c4", -227, 600- 96-265, 10);
		
		var player = new createjs.Shape();
		player.graphics.beginFill("#880000").drawRect(-34/2, -60, 34, 60);
		player.graphics.beginFill("#000000").drawCircle(-1, -1, 3, 3);
		player.x = 700; player.y = 300;
		this.main.addChild(player);
		this.player = player;

		addCloud("c1",  237, 0, 15);
		addCloud("c5",  153, 600- 60-102, 15);
		addCloud("c3",   88, 600-170-277, 20);		
	};
	
	DarkState.prototype.debug = function() {
		return "T: " + Math.round(this.t * 10) / 10;
	}
	
	DarkState.prototype.start = function() {
		this.main.visible = true;
		createjs.Tween.get(this.eyelid).to({y:0}, 200);
		createjs.Tween.get(this.main).to({alpha:1}, 300);
	}
	
	DarkState.prototype.update = function() {
		this.clouds.forEach(function (c) {
			c.x += c.vx;
			if (c.x > 800) c.x = -800;
		});
		
		this.t += 1/60;
		var vx = Math.sin(this.t*60/4);
		vx *= (vx < 0) ? .8 : 4;
		this.player.x -= vx;
		
		if (this.t > 10) {
			createjs.Tween.get(this.eyelid).to({y:-631}, 400);
			createjs.Tween.get(this.main).to({alpha:0}, 300);
		}
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