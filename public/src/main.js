require(["domReady", "DemolitionState", "DarkState", "TitleState", "JobState", "ThinkingState", "Building1", "Building2", "Building3", "Building4"],
function(domReady, DemolitionState, DarkState, TitleState, JobState, ThinkingState, Building1, Building2, Building3, Building4) {
	domReady(function() {

		var preload = new createjs.LoadQueue();
		preload.onProgress = function(p) { 
			document.getElementById("loading").innerText
				= "Loading... " + (p.progress * 100).toFixed(1) + "%";
		};
		preload.installPlugin(createjs.Sound);
		preload.addEventListener("complete", handleComplete);
		preload.loadManifest([
			{id:"m_demolition", src:"demolition.mp3"},
			{id:"m_dark", src:"dark.mp3"},
			{id:"m_special", src:"special.mp3"},
			
			{id:"s_explosion", src:"explosion.mp3"},

			{id: "title", src:"img/title.png"},
			{id: "t1t", src:"img/t1t.png"},
			{id: "t1s", src:"img/t1s.png"},
			{id: "eyelid_top", src:"img/eyelid_top.png"},
			{id: "demolition", src:"img/demolition.png"},
			{id: "dyn", src:"img/dyn.png"},
			{id: "player", src:"img/player.png"},
			{id: "demolition_talk1", src:"img/demolition_talk1.png"},
			{id: "aftermath_talk1", src:"img/aftermath_talk1.png"},
			{id: "b1", src:"img/b1.png"},
			{id: "b1i", src:"img/b1i.png"},
			{id: "b1d", src:"img/b1d.png"},
			{id: "b1fl", src:"img/b1fl.png"},
			{id: "b2", src:"img/b2.png"},
			{id: "b2i", src:"img/b2i.png"},
			{id: "b2d", src:"img/b2d.png"},
			{id: "b2fbc", src:"img/b2fbc.png"},
			{id: "b2fl", src:"img/b2fr.png"},
			{id: "b2fr", src:"img/b2fl.png"},
			{id: "b3", src:"img/b3.png"},
			{id: "b3i", src:"img/b3i.png"},
			{id: "b3d", src:"img/b3d.png"},
			{id: "b3ftl", src:"img/b3ftl.png"},
			{id: "b3ftr", src:"img/b3ftr.png"},
			{id: "b3ft", src:"img/b3ft.png"},
			{id: "b4", src:"img/b4.png"},
			{id: "b4i", src:"img/b4i.png"},
			{id: "b4d", src:"img/b4d.png"},
			{id: "b4fi", src:"img/b4fi.png"},
			{id: "b4fb", src:"img/b4fb.png"},
			{id: "b4ffl", src:"img/b4ffl.png"},
			{id: "b4ffr", src:"img/b4ffr.png"},
			{id: "b4ftl", src:"img/b4ftl.png"},
			{id: "b4ftr", src:"img/b4ftr.png"},
			{id: "c1", src:"img/c1.png"},
			{id: "c2", src:"img/c2.png"},
			{id: "c3", src:"img/c3.png"},
			{id: "c4", src:"img/c4.png"},
			{id: "c5", src:"img/c5.png"},
			{id: "dl2", src:"img/DL1.png"},
			{id: "dl3", src:"img/dl3.png"},
			{id: "dl4", src:"img/dl4.png"},
			{id: "flash", src:"img/flash.png"},
			{id: "smoke1", src:"img/smoke1.png"},
			{id: "smoke2", src:"img/smoke2.png"},
			{id: "job1", src:"img/job1.png"},
			{id: "job2", src:"img/job2.png"},
			{id: "job3", src:"img/job3.png"},
			{id: "job4", src:"img/job4.png"},
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
			{id: "help9", src:"img/help9.png"},
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
			var lastMusic;
			function updateMusic() {
				var music = state.music || "special";
				if (music != lastMusic) {
					createjs.Sound.stop();
					createjs.Sound.play("m_"+music, {interrupt:createjs.Sound.INTERRUPT_NONE, loop:-1, volume:0.4});
					lastMusic = music;
				}
			}
			function switchTo(s) {
				stage.removeAllChildren();
				state = s;
				stage.addChild(state.view);
				state.start();
				updateMusic();
			}
			function push(s) {
				lastState = state;
				state = s;
				stage.addChild(state.view);
				state.start();
				updateMusic();
			}
			function pop() {
				stage.removeAllChildren();
				state = lastState;
				stage.addChild(state.view);
				lastState = undefined;
				updateMusic();
			}
			
			function makeThinking(dl, dyns, dead) {
				return new ThinkingState(preload, function() { lastState.blast(); pop(); });
			}
			
			function makeDark(dl, dyns, dead) {
				return new DarkState(dl, dyns, preload, 
					function() { lastState.blast(); pop(); },
					dead)
			}
			
			var levels = [
				{b: Building1, d: makeThinking, dl: "dl1", job: "job1", jtext: "job_t1", atalk: "aftermath_talk1"},
				{b: Building2, d: makeDark, dl: "dl2", job: "job2", dtalk: "demolition_talk1"},
				{b: Building3, d: makeDark, dl: "dl3", job: "job3"},
				{b: Building4, d: makeDark, dl: "dl4", job: "job4"},
			]
			
			function restartLevel() {
				var b = new (levels[0].b)();
				var dark = levels[0].d;
				function toDark() { push(dark(levels[0].dl, state.dyns, restartLevel)); };
				function toDemolition() { switchTo(new DemolitionState(levels[0].dtalk, levels[0].atalk, b, preload, toDark, nextLevel, restartLevel)); };
				function toJob() { switchTo(new JobState(levels[0].job, levels[0].jtext, preload, toDemolition))}
				toJob();
			}
			function nextLevel() {
				levels.shift();
				restartLevel();
			}
			function toTitle() { switchTo(new TitleState(preload, restartLevel)); };
			
			toTitle();
			
			createjs.Ticker.setFPS(60);
			createjs.Ticker.addListener(stage);
			createjs.Ticker.addEventListener("tick", function() { 
				state.update();
				
				document.getElementById("debug").innerText = state.debug();
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
