var avatars = [ // Creates a table with the list of avatars from Ran and Chen
    "assets/images/avatar/ran/avatar1.png",
    "assets/images/avatar/ran/avatar2.png",
    "assets/images/avatar/ran/avatar3.png",
    "assets/images/avatar/ran/avatar4.png",
    "assets/images/avatar/ran/avatar5.png",
    "assets/images/avatar/ran/avatar6.png",
    "assets/images/avatar/ran/avatar7.png",
    "assets/images/avatar/ran/avatar8.png",
    "assets/images/avatar/ran/avatar9.png",
    "assets/images/avatar/ran/avatar10.png",
    "assets/images/avatar/chen/avatar1.png",
    "assets/images/avatar/chen/avatar2.png",
    "assets/images/avatar/chen/avatar3.png",
    "assets/images/avatar/chen/avatar4.png",
    "assets/images/avatar/chen/avatar5.png",
    "assets/images/avatar/chen/avatar6.png",
    "assets/images/avatar/chen/avatar7.png",
    "assets/images/avatar/chen/avatar8.png",
    "assets/images/avatar/chen/avatar9.png",
    "assets/images/avatar/chen/avatar10.png"
];
// function chgimg(avatars){return avatars[Math.floor(Math.random()*avatars.length)];} // abandoned function to change the avatar image
function chentip() {
    alert('If you hold down shift and click the avatar, chen will run forever until you refresh the page c:')
}
var running = false;
var repeatrun = false;

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

    function dothething() { // this is the shittiest way of doing this. please... never attempt this yourself. you will go through hours of pain like I did.
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
$(function() {
    changeavatarimage(); // Pick a random avatar and change it before the page fades in, so the avatar isint the same every time you load the page
    $("body").fadeIn(1000);
    var $avi = $(".avatar");
    $avi.click(function() {
        if (window.event.shiftKey) {
            repeatrun = true
        }
        setTimeout(chenhonk(), 10)
        changeavatarimage()
            /* // no need for this since chenhonk() c:
            // plus it was resource intensive anyway
            let $rip = $('<div class="ripple"/>')
            $avi.prepend($rip);
            $rip.ready(function() {
                $rip.addClass("rippleout");
                setTimeout(function() {
                    $rip.remove();
                }, 5000)
            })
            */
            //changeavatarimage()
            // $rip.animate({
            // 	width: "calc( max(142vw, 142vh) + 250px );",
            // 	height: "calc( max(142vw, 142vh) + 250px );"
            // }, 5000)
            // setTimeout(function(){
            // 	$(".ripple").removeClass("rippleout");
            // }, 5000);
    })
    let menuOpen = false;
    const mobileMenuButton = $(".mobile-menu-button");
    const mobileMenuContainer = $(".mobile-menu-container");
    const mobileMenuLinks = $(".mobile-menu-links");

    mobileMenuButton.click(function() {
        menuOpen = !menuOpen;

        mobileMenuLinks.slideToggle(200)
    });
});

function changeavatarimage() {
    $(".avatarnormal").attr("src", avatars[Math.floor(Math.random() * avatars.length)]);
}