require(["domReady", "DemolitionState", "DarkState"],
function(domReady, DemolitionState, DarkState) {
	domReady(function() {

		var queue = new createjs.LoadQueue();
		queue.installPlugin(createjs.Sound);
		queue.addEventListener("complete", handleComplete);
		queue.loadManifest([
			{id: "eyelid_top", src:"img/eyelid_top.png"},
			{id: "demolition", src:"img/demolition.png"},
			{id: "b1", src:"img/b1.png"},
			{id: "b1i", src:"img/b1i.png"},
			{id: "dark1", src:"img/dark1.png"}
		]);
		
		function handleComplete() {
			var stage = new createjs.Stage("canvas");
			
			var black = new createjs.Shape();
			black.graphics.beginFill("black").drawRect(0, 0, 800, 600);
			stage.addChild(black);
			
			var state;
			function switchTo(s) {
				state = s;
				state.start();
			}			
			
			var darkState = new DarkState(queue);
			var demolitionState = new DemolitionState(queue, function() { switchTo(darkState) });
			stage.addChild(demolitionState.view);
			stage.addChild(darkState.view);
			
			switchTo(demolitionState);
			
			var debug = new createjs.Text("Debug Info");
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
		}
	});
});
