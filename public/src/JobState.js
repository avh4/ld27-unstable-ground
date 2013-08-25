define([], function() {
	
	function JobState(preload, proceed) {
		var th = this;
		this.proceed = proceed;
		this.view = new createjs.Container();
		
		this.view.addChild(new createjs.Bitmap(preload.getResult("job1")));
		this.text = this.view.addChild(new createjs.Bitmap(preload.getResult("job_t1")));
		this.help = this.view.addChild(new createjs.Bitmap(preload.getResult("help7")));
		this.help.setTransform(569, 600-109-33);
	};
	
	JobState.prototype.debug = function() {
		return "";
	}
	
	JobState.prototype.start = function() {
		this.text.alpha = 0;
		createjs.Tween.get(this.text).to({alpha:1}, 4000).to({alpha:0}, 4000);
		
		this.help.alpha = 0;
		createjs.Tween.get(this.help).wait(3000).to({alpha:1}, 500);
	}
	
	JobState.prototype.update = function() {
	}
	
	JobState.prototype.leftButton = function() {
	};
	
	JobState.prototype.rightButton = function() {
	};
	
	JobState.prototype.upButton = function() {
	};
	
	JobState.prototype.downButton = function() {
	};
	
	JobState.prototype.spaceButton = function() {
		this.proceed();
	};
	
	return JobState;
});