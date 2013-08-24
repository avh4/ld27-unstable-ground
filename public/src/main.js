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
			createjs.Sound.play("sound");
			var image = queue.getResult("eyelid_top");

			var stage = new createjs.Stage("canvas");

			var background = new createjs.Bitmap(queue.getResult("demolition"));
			stage.addChild(background);

			eyelid = new createjs.Bitmap(image);
			eyelid.y = -631;
			stage.addChild(eyelid);

			createjs.Tween.get(eyelid).to({y:0}, 1000);

			createjs.Ticker.setFPS(60);
			createjs.Ticker.addListener(stage);
		}
	});
});
