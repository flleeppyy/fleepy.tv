import type {FastifyInstance} from "fastify";

export const links = [
  {
    "title": "Bandcamp",
    "href": "https://flleeppyy.bandcamp.com/",
    "icon": "img/icons/bandcamp.png",
    "bgColor": "#4B5154",
    "textColor": "white",
    "badgeUrl": "/img/bandcamp.png"
  },
  {
    "title": "Ko-Fi",
    "href": "https://ko-fi.com/flleeppyy",
    "icon": "img/icons/kofi.png",
    "bgColor": "#29abe0",
    "textColor": "white",
    "badgeUrl": "/img/kofi.png"
  }, {
    "title": "Twitter",
    "href": "https://twitter.com/flleeppyy",
    "icon": "img/icons/twitter.png",
    "bgColor": "#1da1f2",
    "textColor": "white",
    "badgeUrl": "/img/twitter.png"
  }, {
    "title": "Twitch",
    "href": "https://twitch.tv/flleeppyy",
    "icon": "img/icons/twitch.png",
    "bgColor": "#5e3b9c",
    "textColor": "white",
    "badgeUrl": "/img/twitch.png"
  }, {
    "title": "Telegram",
    "href": "https://t.me/flleeppyy",
    "icon": "img/icons/telegram.png",
    "bgColor": "white",
    "textColor": "black",
    "badgeUrl": "/img/telegram.png"
  }, {
    "title": "Tumblr",
    "href": "https://flleeppyy.tumblr.com",
    "icon": "img/icons/tumblr.png",
    "bgColor": "#36465d",
    "textColor": "white",
    "iconCss": "border-radius: 100%",
    "badgeUrl": "/img/tumblr.png"
  }, {
    "title": "YouTube",
    "href": "https://u.fleepy.tv/youtube",
    "icon": "img/icons/youtube.png",
    "bgColor": "#ff1111",
    "textColor": "white",
    "badgeUrl": "/img/youtube.png"
  }, {
    "title": "Steam",
    "href": "https://steamcommunity.com/id/flleeppyy/",
    "icon": "img/icons/steam.png",
    "bgColor": "white",
    "textColor": "black",
    "badgeUrl": "/img/steam.png"
  }, {
    "title": "GitHub",
    "href": "https://github.com/flleeppyy",
    "icon": "img/icons/github.png",
    "bgColor": "#111213",
    "textColor": "white",
    "badgeUrl": "/img/github.png"
  }, {
    "title": "Business Email",
    "href": "mailto:flleeppyybusiness@gmail.com",
    "icon": "img/icons/email.png",
    "bgColor": "white",
    "textColor": "#111213",
    "badgeUrl": "/img/email.png"
  }
];

export default (app :FastifyInstance) => {
  app.get("/api/links", (req, res) => {
    res.send({
      links
    });
  });
}
