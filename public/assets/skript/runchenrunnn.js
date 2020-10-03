
// dont blame me for this, i just split this to a different file
//		- seed 2020

function chenhonk() {
	// please ignore this fuckfest of a mess

	if (running == true)
		return;
	// transition, left/right, transform, rotate
	if (repeatrun) {
		setInterval(function() {
			dothething()
		}, 1050)
	} else {
		dothething()
	}

	function dothething() {
		//console.log($(".honk").attr("style"));

		running = true
		if ($(".honk").attr("style") == "transition: right 1s linear; right: -30%; transform: scale(0.4) rotate(0deg); top: unset; bottom: -50px;") {
			//if ready to travel to left
			//console.log("gotoleft")
			$(".honk").attr("style", "transition: right 1s linear; right: 140%; transform: scale(0.4) rotate(0deg); top: unset; bottom: -50px;");
		} else if ($(".honk").attr("style") == "transition: left 1s linear; left: -30%; transform: scale(0.4) rotate(180deg); top: 0px; bottom: unset;") {
			// if ready to travel to right
			//console.log("gotoright")
			$(".honk").attr("style", "transition: left 1s linear; left: 140%; transform: scale(0.4) rotate(180deg); top: 0px; bottom: unset;");
		} //else console.log("failed first if check");

		setTimeout(function() {
			// transition, left/right, transform, rotate
			//console.log($(".honk").attr("style"));
			if ($(".honk").attr("style") == "transition: right 1s linear; right: 140%; transform: scale(0.4) rotate(0deg); top: unset; bottom: -50px;") {
				// if chen just ran from the bottom right side
				//console.log("came from right")
				$(".honk").attr("style", "transition: right 0s linear; left: 140%; transform: scale(0.4) rotate(180deg); top: unset; bottom: -50px;");
				$(".honk").attr("style", "transition: left 0s linear; left: -30%; transform: scale(0.4) rotate(180deg); top: unset; bottom: -50px;");
				$(".honk").attr("style", "transition: left 1s linear; left: -30%; transform: scale(0.4) rotate(180deg); top: 0px; bottom: unset;");
			} else if ($(".honk").attr("style") == "transition: left 1s linear; left: 140%; transform: scale(0.4) rotate(180deg); top: 0px; bottom: unset;") {
				// if chen just ran from the top left side
				//console.log("came from left")
				$(".honk").attr("style", "transition: left 0s linear; right: 140%; transform: scale(0.4) rotate(0deg); top: 0px; bottom: unset;");
				$(".honk").attr("style", "transition: right 0s linear; right: -30%; transform: scale(0.4) rotate(0deg); top: 0px; bottom: unset;");
				$(".honk").attr("style", "transition: right 1s linear; right: -30%; transform: scale(0.4) rotate(0deg); top: unset; bottom: -50px;");
			} else {
				//console.log("failed if check");
				//console.log($(".honk").attr("style"));
			}
			running = false;
		}, 1000)
	}

}

$(()=>{
	$(".avatar").click(function() {
		if (window.event.shiftKey) {
			repeatrun = true;
		}
		setTimeout(chenhonk(), 10)

	})
})
