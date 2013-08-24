define([], function() {
	
	function JobState(preload, proceed) {
		var th = this;
		this.proceed = proceed;
		this.view = new createjs.Container();
		
		this.view.addChild(new createjs.Bitmap(preload.getResult("job1")));
		this.view.addChild(new createjs.Bitmap(preload.getResult("job_t1")));
	};
	
	JobState.prototype.debug = function() {
		return "";
	}
	
	JobState.prototype.start = function() {
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