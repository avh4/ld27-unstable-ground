define(["ShoutBubble"], 
function(ShoutBubble) {
	
	function ThinkingState(preload, blast) {
		var th = this;
		this.music = "dark";
		this.t = 0;
		this.blast = blast;
		var view = this.view = new createjs.Container();
		
		var eyelid = this.eyelid = view.addChild(new createjs.Bitmap(preload.getResult("eyelid_top")));
		eyelid.y = -631;
		
		this.clouds = [];
		function addCloud(img, x, y, vx) {
			var c = new createjs.Bitmap(preload.getResult(img));
			c.x = x; c.y = y;
			c.vx = vx;
			th.clouds.push(c);
			view.addChild(c);
		}
		addCloud("c2", -117, 600-255-278, 5);
		addCloud("c4", -227, 600- 96-265, 10);
		
		var text = this.text = new createjs.Bitmap(preload.getResult("thinking1"));
		this.view.addChild(text.setTransform(80, 600-166-236));
		
		addCloud("c1",  237, 0, 15);
		addCloud("c5",  153, 600- 60-102, 15);
		addCloud("c3",   88, 600-170-277, 20);
		
		this.bubble = this.view.addChild(new ShoutBubble(200, preload));
	};
	
	ThinkingState.prototype.debug = function() {
		return "T: " + Math.round(this.t * 10) / 10;
	}
	
	ThinkingState.prototype.start = function() {
		createjs.Tween.get(this.eyelid).to({y:0}, 200);
		
		this.text.alpha = 0;
		createjs.Tween.get(this.text).to({alpha:1}, 4000).to({alpha:0}, 5000);
	}
	
	ThinkingState.prototype.update = function() {
		this.clouds.forEach(function (c) {
			c.x += c.vx;
			if (c.x > 800) c.x = -800;
		});
		
		this.t += 1/60;
		
		var s = 10 - Math.floor(this.t);
		if (s > 0) this.bubble.shout(s);
		
		if (s <= 0) {
			this.blast();
		}

		if (this.t > 10) {
			createjs.Tween.get(this.eyelid).to({y:-631}, 400);
		}
	}
	
	ThinkingState.prototype.leftButton = function() {
	};
	
	ThinkingState.prototype.rightButton = function() {
	};
	
	ThinkingState.prototype.upButton = function() {
	};
	
	ThinkingState.prototype.downButton = function() {
	};
	
	ThinkingState.prototype.spaceButton = function() {
	}
	
	return ThinkingState;
});