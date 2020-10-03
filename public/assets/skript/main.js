let clicked = 0
function honkhonk() {
  if (clicked !== 3) return clicked++
  else {
	clicked = 99
	alert("honk honk")
	initChenMoving()
  }
}

// function chgimg(avatars){return avatars[Math.floor(Math.random()*avatars.length)];} // abandoned function to change the avatar image
function chentip() {
	// alert('If you hold down shift and click the avatar, chen will run forever until you refresh the page c:')
	// just dont do this will remove soon TM
}
var running = false;
var repeatrun = false;


$(function() {
	// Pick a random avatar and change it before the page fades in
	$("body").fadeIn("slow");
	// Fades in the body, excluding the background

	// Gets called if avatar gets clicked 5 times or more within 5 seconds
	function easterEgg() {
		// Rick-Roll
		window.location = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
	}



	let menuOpen = false;
	const mobileMenuButton = $(".mobile-menu-button");
	const mobileMenuContainer = $(".mobile-menu-container");
	const mobileMenuLinks = $(".mobile-menu-links");

	mobileMenuButton.click(function() {
		menuOpen = !menuOpen;

		mobileMenuLinks.slideToggle(200)
	});
});
