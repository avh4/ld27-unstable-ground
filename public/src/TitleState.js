define([], function() {
	
	function TitleState(preload, proceed) {
		var th = this;
		this.proceed = proceed;
		this.view = new createjs.Container();
		
		this.view.addChild(new createjs.Bitmap(preload.getResult("title")));
		
		var eyelid = this.eyelid = new createjs.Bitmap(preload.getResult("eyelid_top"));
		eyelid.y = -631;
		this.view.addChild(eyelid);
		this.eyelid = eyelid;

		this.t1s = this.view.addChild(new createjs.Bitmap(preload.getResult("t1s"))).setTransform(113, 600-15-129);
		this.view.addChild(new createjs.Bitmap(preload.getResult("t1t"))).setTransform(113, 600-15-129);		
	};
	
	TitleState.prototype.debug = function() {
		return "";
	}
	
	TitleState.prototype.start = function() {
		this.t1s.alpha = 0.4;
		createjs.Tween.get(this.t1s, {loop: true}).to({alpha:0.8}, 1500).to({alpha:0.4}, 1500);
		
		var eyelid = this.eyelid;
		eyelid.y = -631;
		function blink() {
			var speed = Math.random() * 50 + 50;
			var delay = Math.random() * 10000 + 100;
			createjs.Tween.get(eyelid)
			  .wait(delay)
			  .to({y: 0}, speed).to({y: -631}, speed)
			  .call(blink);
		}
		blink();
	}
	
	TitleState.prototype.update = function() {
	}
	
	TitleState.prototype.leftButton = function() {
	};
	
	TitleState.prototype.rightButton = function() {
	};
	
	TitleState.prototype.upButton = function() {
	};
	
	TitleState.prototype.downButton = function() {
	};
	
	TitleState.prototype.spaceButton = function() {
		this.proceed();
	};
	
	return TitleState;
});