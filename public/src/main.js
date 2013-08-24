require(["domReady", "DemolitionState", "DarkState", "TitleState", "JobState"],
function(domReady, DemolitionState, DarkState, TitleState, JobState) {
	domReady(function() {

		var preload = new createjs.LoadQueue();
		preload.installPlugin(createjs.Sound);
		preload.addEventListener("complete", handleComplete);
		preload.loadManifest([
			{id: "title", src:"img/title.png"},
			{id: "t1t", src:"img/t1t.png"},
			{id: "t1s", src:"img/t1s.png"},
			{id: "eyelid_top", src:"img/eyelid_top.png"},
			{id: "demolition", src:"img/demolition.png"},
			{id: "b1", src:"img/b1.png"},
			{id: "b1i", src:"img/b1i.png"},
			{id: "b1d", src:"img/b1d.png"},
			{id: "b1fl", src:"img/b1fl.png"},
			{id: "c1", src:"img/c1.png"},
			{id: "c2", src:"img/c2.png"},
			{id: "c3", src:"img/c3.png"},
			{id: "c4", src:"img/c4.png"},
			{id: "c5", src:"img/c5.png"},
			{id: "dl1", src:"img/DL1.png"},
			{id: "smoke1", src:"img/smoke1.png"},
			{id: "smoke2", src:"img/smoke2.png"},
			{id: "job1", src:"img/job1.png"},
			{id: "job_t1", src:"img/job_t1.png"},
		]);
		
		function handleComplete() {
			var stage = new createjs.Stage("canvas");
			
			var black = new createjs.Shape();
			black.graphics.beginFill("black").drawRect(0, 0, 800, 600);
			stage.addChild(black);
			
			var state;
			var demolitionState;
			var darkState;
			var titleState;
			function switchTo(s) {
				stage.removeAllChildren();
				switch (s) {
					case "TITLE": state = titleState; break;
					case "JOB1": state = new JobState(preload, function() { switchTo("DEMOLITION") }); break;
					case "DEMOLITION": state = demolitionState; break;
					case "DARK": state = darkState; break;
				}
				stage.addChild(state.view);
				state.start();
			}
			
			var titleState = new TitleState(preload, function() { switchTo("JOB1")});
			var darkState = new DarkState(preload);
			// var demolitionState = new DemolitionState(preload, function() { switchTo(darkState) });
			var demolitionState = new DemolitionState(preload, function() { demolitionState.blast() });
			
			switchTo("TITLE");
			
			var debug = new createjs.Text("Debug Info");
			debug.color = "white";
			stage.addChild(debug);
			
			createjs.Ticker.setFPS(60);
			createjs.Ticker.addListener(stage);
			createjs.Ticker.addEventListener("tick", function() { 
				state.update();
				debug.text = state.debug();
			});
			
			keypress.combo("right", function() { state.rightButton() });
			keypress.combo("left", function() { state.leftButton() });
			keypress.combo("up", function() { state.upButton() });
			keypress.combo("down", function() { state.downButton() });
			keypress.combo("space", function() { state.spaceButton() });
			keypress.combo("d", function() { demolitionState.blast() });
		}
	});
});
