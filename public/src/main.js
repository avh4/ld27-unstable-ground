require(["domReady"],
function(domReady) {
	domReady(function() {

		var queue = new createjs.LoadQueue();
		queue.installPlugin(createjs.Sound);
		queue.addEventListener("complete", handleComplete);
		queue.loadManifest([
			{id: "eyelid_top", src:"img/eyelid_top.png"},
			{id: "demolition", src:"img/demolition.png"}
		]);

		function handleComplete() {
			var image = queue.getResult("eyelid_top");

			var stage = new createjs.Stage("canvas");
			
			var background = new createjs.Bitmap(queue.getResult("demolition"));
			stage.addChild(background);

			var player = new createjs.Shape();
			player.graphics.beginFill("#ff0000").drawRect(-34/2, -60, 34, 60);
			player.graphics.beginFill("#000000").drawCircle(-1, -1, 3, 3);
			player.y = 500;
			player.x = 20;
			stage.addChild(player);

			eyelid = new createjs.Bitmap(image);
			eyelid.y = -631;
			stage.addChild(eyelid);

			createjs.Ticker.setFPS(60);
			createjs.Ticker.addListener(stage);
			
			keypress.combo("d", function() {
			    createjs.Tween.get(eyelid).to({y:0}, 1000);
			});
			keypress.combo("o", function() {
			    createjs.Tween.get(eyelid).to({y:-631}, 1000);
			});
			keypress.combo("right", function() {
				player.x += 10;
			});
			keypress.combo("left", function() {
				player.x -= 10;
			});
		}
	});
});
