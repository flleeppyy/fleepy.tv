// Copyright (C) 2021 Flleeppyy (Micah Jinkerson)
// https://github.com/flleeppyy/fleepy.tv/blob/master/LICENSE

// FYI, THIS IS COMPILED TYPESCRIPT IF IT ENDS IN .JS

/**
* Throughout the script, you'll see a few self initiated functions or whatever the fuck you want to call them.
* they look like this: (() => { ... })()
* This is to keep the scopes seperated for certain things.
* I just get overly paranoid about accidentally mixing up variable and function names.
* 9 * / 10 i always forget the ending curly brackets and i always wonder why some shit doesnt work

note to self, dont use quotes or double quotes in scripts. it fucks with Reindent Lines in vscode
*/



$(() => {
  const main = $('main');
  const wdipitt = $('#whydidiputinthisthing');
  $('html').css('background','none');
  
  
  
  
  
  // All this does is check every 50ms to see if Arc loaded, then set the z-index to a not retardedly high number.
  // this is simply to hide it on the terminal screen. It shows once the terminal is gone. purely asthetic
  const setArcZI = setInterval(() => { 
    const f = ()=>{$('#arc-widget-container').attr('style', `${$('#arc-widget-container').attr('style')} z-index:2!important;`)}
    if ($('#arc-widget-container').length > 0) {
      setTimeout(()=>{f(); return clearInterval(setArcZI)}, 300)
    }
    f()
  }, 50)
  
  const links = [
    new Link("Bandcamp", "https://flleeppyy.bandcamp.com/", "img/icons/bandcamp.png", "#4B5154", "white"),
    new Link("Spotify", "https://open.spotify.com/artist/5d88PKcv3BK7d4K9LFpPJM", "img/icons/spotify.png", "#1DB954", "white"),
    new Link("Ko-Fi", 'https://ko-fi.com/flleeppyy', "img/icons/kofi.png", "#29abe0", "white"),
    new Link("Twitter", "https://twitter.com/", "img/icons/twitter.png", "#1da1f2", "white"),
    new Link("Tumblr", "https://flleeppyy.tumblr.com", "img/icons/tumblr.png", "#36465d", "white", "border-radius: 100%"),
    new Link("YouTube", "https://u.fleepy.tv/youtube", "img/icons/youtube.png", "#ff1111", "white"),
    new Link("GitHub", "https://github.com/flleeppyy", "img/icons/github.png", "#111213", "white"),
    new Link("Business Email", "mailto:flleeppyybusiness@gmail.com", "img/icons/email.png", "white", "#111213"),
  ];
  
  links.forEach(link => {
    const button = $(`<button href="${link.href}" class="dropshadow"><img src="${link.icon}" ${link.iconCss ? `style="${link.iconCss}"` : ""}><div class="linkTitle"><p>${link.title}</p></div></button>`)
    // console.log(button)
    button.attr('onclick', `window.location = '${link.href}'`)
    // button.attr('onclick', `console.log(this, event)`)
    button.css({
      "background": link.bgColor || "white",
      "color": link.textColor || "black"
    })
    button.appendTo('links')
    button.on("mousedown", "a.external", e => {
      e.preventDefault();
      if (link.title === "Business Email") {
        return;
      }
      $('#fallbackContainer').fadeIn(100)
      main.fadeOut(400)
    })
    
    // We have to use normal javascript (not jquery) to add the mouse down listener because JQuery doesn't detect middle click or right click as a click event.
    button[0].addEventListener('mousedown', e => { // fuck you jquery
      if (e.which === 2) {
        e.preventDefault()
        window.open(link.href, "_blank")
      }
    })
  });
  
  let paused = false;
  let fallback = false
  // @ts-ignore
  new Typed('#typeThis', {
    strings: ['^200yarn start^100\r^200\n<strong>`yarn run v1.22.5`</strong>\r\n`$ tsc &amp;&amp; PORT=8001 ts-node .`\r\n^400 `listening at https://fleepy.tv\r\n`'],
    typeSpeed: 40,
    shuffle: true,
    onStringTyped: () => {
      main.fadeIn(400);
      $('#loadingContainer').fadeOut(400);
      wdipitt.fadeIn(400)
      setTimeout(() => { // Avatar and text hue rotate
        if (fallback !== true) {
          startHue();
        }
        fallback = true;
        wdipitt.css('max-width', '100%')
        // https://stackoverflow.com/questions/18143899/jquery-run-function-after-css-transition-is-done#18144024
        wdipitt.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(event){ 
          wdipitt.css('max-height', '100%')
          $(this).off(event);
        });
      }, 400);
    },
    onTypingPaused: () => {
      if (paused !== true) {
        $('#process').html('yarn*')
        // console.log('set to yarn typing paused')
        paused = true;
      }
    }
  });
  
  
  $(document).on('keydown', e => {
    if (e.key === ' ') {
      if (fallback === true) return;
      fallback = true;
      startHue();
      wdipitt.css('transition', 'none')
      $('#loadingContainer').fadeOut(100);
      main.fadeIn(100);
      wdipitt.css('max-width', '100%');
      wdipitt.css('max-height', '100%');
    }
  });
  
  function startHue() {
    const saturation = 100;
    const interval = 30;
    let hue = 0;
    setInterval(() => {
      (hue >= 360) ? hue = 0 : '';
      hue++
      $('#chen').css('border', `0.3em solid ` + new Hsl(hue, saturation, 90).toString());
      wdipitt.css('border', (`0.3em solid ` + new Hsl(hue, 100, 80).toString()));
      $('#name').css('color', new Hsl(hue, saturation, 90).toString());
    }, interval)
  }
  
})