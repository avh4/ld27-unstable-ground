require(["domReady"],
function(domReady) {
	domReady(function() {

		var queue = new createjs.LoadQueue();
		queue.installPlugin(createjs.Sound);
		queue.addEventListener("complete", handleComplete);
		queue.loadManifest([
			{id: "eyelid_top", src:"img/eyelid_top.png"},
			{id: "demolition", src:"img/demolition.png"},
			{id: "b1", src:"img/b1.png"},
			{id: "b1i", src:"img/b1i.png"}
		]);
		
		function handleComplete() {
			var stage = new createjs.Stage("canvas");
			
			var background = new createjs.Bitmap(queue.getResult("demolition"));
			stage.addChild(background);

			b1i = new createjs.Bitmap(queue.getResult("b1i"));
			b1i.x = 418; b1i.y = 200;
			stage.addChild(b1i);
			b1 = new createjs.Bitmap(queue.getResult("b1"));
			b1.x = 418 + 1; b1.y = 200 + 2;
			stage.addChild(b1);

			var player = new createjs.Shape();
			player.graphics.beginFill("#ff0000").drawRect(-34/2, -60, 34, 60);
			player.graphics.beginFill("#000000").drawCircle(-1, -1, 3, 3);
			player.y = 500;
			player.x = 400;
			stage.addChild(player);

			eyelid = new createjs.Bitmap(queue.getResult("eyelid_top"));
			eyelid.y = -631;
			stage.addChild(eyelid);
			
			createjs.Ticker.setFPS(60);
			createjs.Ticker.addListener(stage);
			
			function updateBuilding() {
				b1.visible = player.y >= 500;
			}
			
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
			keypress.combo("up", function() {
				player.y -= 30;
				updateBuilding();
			});
			keypress.combo("down", function() {
				player.y += 30;
				updateBuilding();
			});
		}
	});
});
