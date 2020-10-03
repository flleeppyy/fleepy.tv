function chenGen() {
	var avatarPath = "assets/images/avatar/";
	var maxAvatar = {
		chen: 10,
		ran: 10
	}


		// Decide if the avatar is going to be chen or ran.
	var chenOrRan = "chen";
	if (Math.floor((Math.random() * 2)) == 0) {
		chenOrRan = "ran";
	}
	console.log("[chenAvatar.js] chenOrRan",chenOrRan)
	avatarPath+=`${chenOrRan}/`;

		// Decide what avatarID we're using.
		// (Generate a number between 1 and the avatars count, defined in maxAvatar,
		// and set the variable avatarID as the number generated.)
	var avatarID = Math.floor((Math.random() * eval(`maxAvatar.${chenOrRan}`)) + 1);

	avatarPath+=`avatar${avatarID}.png`;
	console.log("[chenAvatar.js] avatarID",avatarID)
	console.log("[chenAvatar.js] Final Path", avatarPath)

	return avatarPath;
}
$(()=>{
	$(".avatarnormal").attr("src", chenGen());
	$(document).on('click','.avatar',()=>{
		$(".avatarnormal").attr("src", chenGen());
	})
})
