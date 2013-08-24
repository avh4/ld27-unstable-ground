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
			
			var darkState = new DarkState(queue);

			function switchToDark() {
				state = darkState;
				state.start();
			}
			
			state = new DemolitionState(queue, switchToDark);
			stage.addChild(state.view);
			stage.addChild(darkState.view);
			
			var debug = new createjs.Text("Text");
			stage.addChild(debug);
			
			createjs.Ticker.setFPS(60);
			createjs.Ticker.addListener(stage);
			createjs.Ticker.addEventListener("tick", function() { 
				state.update();
				debug.text = "x: " + state.p.x;
			});
			
			keypress.combo("o", function() {
			    createjs.Tween.get(eyelid).to({y:-631}, 1000);
			});
			keypress.combo("right", function() { state.rightButton() });
			keypress.combo("left", function() { state.leftButton() });
			keypress.combo("up", function() { state.upButton() });
			keypress.combo("down", function() { state.downButton() });
			keypress.combo("space", function() { state.spaceButton() });
		}
	});
});
