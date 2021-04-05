export default () => {
  const main = $('main');
  const links = [
    new Link("Bandcamp", "https://flleeppyy.bandcamp.com/", "img/icons/bandcamp.png", "#4B5154", "white"),
    new Link("Spotify", "https://open.spotify.com/artist/5d88PKcv3BK7d4K9LFpPJM", "img/icons/spotify.png", "#1DB954", "white"),
    new Link("Ko-Fi", 'https://ko-fi.com/flleeppyy', "img/icons/kofi.png", "#29abe0", "white"),
    new Link("Twitter", "https://twitter.com/flleeppyy", "img/icons/twitter.png", "#1da1f2", "white"),
    new Link("Telegram", "https://t.me/flleeppyy", "img/icons/telegram.png", "white"),
    new Link("Tumblr", "https://flleeppyy.tumblr.com", "img/icons/tumblr.png", "#36465d", "white", "border-radius: 100%"),
    new Link("YouTube", "https://u.fleepy.tv/youtube", "img/icons/youtube.png", "#ff1111", "white"),
    new Link("Steam", "https://steamcommunity.com/id/flleeppyy/", "img/icons/steam.png", "white", "black"),
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
}