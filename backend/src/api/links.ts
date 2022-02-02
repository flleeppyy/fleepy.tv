import type {FastifyInstance} from "fastify";

export const links = [
  {
    "title": "Bandcamp",
    "href": "https://flleeppyy.bandcamp.com/",
    "icon": "img/icons/bandcamp.png",
    "bgColor": "#4B5154",
    "textColor": "white"
  },
  {
    "title": "Spotify",
    "href": "https://open.spotify.com/artist/5d88PKcv3BK7d4K9LFpPJM",
    "icon": "img/icons/spotify.png",
    "bgColor": "#1DB954",
    "textColor": "white"
  },
  {
    "title": "Ko-Fi",
    "href": "https://ko-fi.com/flleeppyy",
    "icon": "img/icons/kofi.png",
    "bgColor": "#29abe0",
    "textColor": "white"
  },
  {
    "title": "Twitter",
    "href": "https://twitter.com/flleeppyy",
    "icon": "img/icons/twitter.png",
    "bgColor": "#1da1f2",
    "textColor": "white"
  }, {
    "title": "Twitch",
    "href": "https://twitch.tv/flleeppyy",
    "icon": "img/icons/twitch.png",
    "bgColor": "#5e3b9c",
    "textColor": "white"
  }, {
    "title": "Telegram",
    "href": "https://t.me/flleeppyy",
    "icon": "img/icons/telegram.png",
    "bgColor": "white",
    "textColor": "black"
  }, {
    "title": "Tumblr",
    "href": "https://flleeppyy.tumblr.com",
    "icon": "img/icons/tumblr.png",
    "bgColor": "#36465d",
    "textColor": "white",
    "iconCss": "border-radius: 100%"
  }, {
    "title": "YouTube",
    "href": "https://u.fleepy.tv/youtube",
    "icon": "img/icons/youtube.png",
    "bgColor": "#ff1111",
    "textColor": "white"
  }, {
    "title": "Steam",
    "href": "https://steamcommunity.com/id/flleeppyy/",
    "icon": "img/icons/steam.png",
    "bgColor": "white",
    "textColor": "black"
  }, {
    "title": "GitHub",
    "href": "https://github.com/flleeppyy",
    "icon": "img/icons/github.png",
    "bgColor": "#111213",
    "textColor": "white"
  }, {
    "title": "Business Email",
    "href": "mailto:flleeppyybusiness@gmail.com",
    "icon": "img/icons/email.png",
    "bgColor": "white",
    "textColor": "#111213"
  }
];

export default(app : FastifyInstance) => {
  app.get("/api/links", (req, res) => {
    res.send({
      links
    });
  });
}
