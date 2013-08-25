require(["domReady", "DemolitionState", "DarkState", "TitleState", "JobState", "ThinkingState", "Building1", "Building2"],
function(domReady, DemolitionState, DarkState, TitleState, JobState, ThinkingState, Building1, Building2) {
	domReady(function() {

		var preload = new createjs.LoadQueue();
		preload.onProgress = function(p) { 
			document.getElementById("loading").innerText
				= "Loading... " + (p.progress * 100).toFixed(1) + "%";
		};
		preload.installPlugin(createjs.Sound);
		preload.addEventListener("complete", handleComplete);
		preload.loadManifest([
			{id: "title", src:"img/title.png"},
			{id: "t1t", src:"img/t1t.png"},
			{id: "t1s", src:"img/t1s.png"},
			{id: "eyelid_top", src:"img/eyelid_top.png"},
			{id: "demolition", src:"img/demolition.png"},
			{id: "demolition_talk1", src:"img/demolition_talk1.png"},
			{id: "aftermath_talk1", src:"img/aftermath_talk1.png"},
			{id: "b1", src:"img/b1.png"},
			{id: "b1i", src:"img/b1i.png"},
			{id: "b1d", src:"img/b1d.png"},
			{id: "b1fl", src:"img/b1fl.png"},
			{id: "b2", src:"img/b2.png"},
			{id: "b2i", src:"img/b2i.png"},
			{id: "b2d", src:"img/b2d.png"},
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
			{id: "bubble_clear", src:"img/bubble_clear.png"},
			{id: "bubble_wait", src:"img/bubble_wait.png"},
			{id: "bubble_10", src:"img/bubble_10.png"},
			{id: "bubble_9", src:"img/bubble_9.png"},
			{id: "bubble_8", src:"img/bubble_8.png"},
			{id: "bubble_7", src:"img/bubble_7.png"},
			{id: "bubble_6", src:"img/bubble_6.png"},
			{id: "bubble_5", src:"img/bubble_5.png"},
			{id: "bubble_4", src:"img/bubble_4.png"},
			{id: "bubble_3", src:"img/bubble_3.png"},
			{id: "bubble_2", src:"img/bubble_2.png"},
			{id: "bubble_1", src:"img/bubble_1.png"},
			{id: "thinking1", src:"img/thinking1.png"},
			{id: "help1", src:"img/help1.png"},
			{id: "help2", src:"img/help2.png"},
			{id: "help3", src:"img/help3.png"},
			{id: "help4", src:"img/help4.png"},
			{id: "help5", src:"img/help5.png"},
			{id: "help6", src:"img/help6.png"},
			{id: "help7", src:"img/help7.png"},
			{id: "help8", src:"img/help8.png"},
		]);
		
		function handleComplete() {
			document.getElementById("loading").innerText = "";
			var stage = new createjs.Stage("canvas");
			
			var black = new createjs.Shape();
			black.graphics.beginFill("black").drawRect(0, 0, 800, 600);
			stage.addChild(black);
			
			var state;
			var lastState;
			var darkState;
			var buildings = [Building1, Building2];
			function switchTo(s) {
				stage.removeAllChildren();
				state = s;
				stage.addChild(state.view);
				state.start();
			}
			function push(s) {
				lastState = state;
				state = s;
				stage.addChild(state.view);
				state.start();
			}
			function pop() {
				stage.removeAllChildren();
				state = lastState;
				stage.addChild(state.view);
				lastState = undefined;
			}
			
			var nextLevel;
			nextLevel = function() {
				var b = new (buildings.shift())();
				function toThinking() { push(new ThinkingState(preload, function() { lastState.blast(); pop(); })); };
				function toDemolition() { switchTo(new DemolitionState(b, preload, toThinking, nextLevel)); };
				function toJob() { switchTo(new JobState(preload, toDemolition))}
				toJob();
			}
			function toTitle() { switchTo(new TitleState(preload, nextLevel)); };
			// var darkState = new DarkState(preload);
			
			toTitle();
			
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
