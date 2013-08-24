define(["ShoutBubble"], 
function(ShoutBubble) {
	
	function ThinkingState(preload, blast) {
		var th = this;
		this.t = 0;
		this.blast = blast;
		this.view = new createjs.Container();
		
		var eyelid = new createjs.Bitmap(preload.getResult("eyelid_top"));
		eyelid.y = -631;
		this.view.addChild(eyelid);
		this.eyelid = eyelid;
		
		var text = this.text = new createjs.Bitmap(preload.getResult("thinking1"));
		this.view.addChild(text.setTransform(80, 600-166-236));
		
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