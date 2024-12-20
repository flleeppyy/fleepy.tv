import type { FastifyInstance } from "fastify";

export const links = [
  {
    title: "Bandcamp",
    href: "https://flleeppyy.bandcamp.com/",
    icon: "img/icons/bandcamp.png",
    bgColor: "#4B5154",
    textColor: "white",
    badgeUrl: "/img/buttons/bandcamp.png",
  },
  {
    title: "Ko-Fi",
    href: "https://ko-fi.com/flleeppyy",
    icon: "img/icons/kofi.png",
    bgColor: "#29abe0",
    textColor: "white",
    badgeUrl: "/img/buttons/kofi.png",
  },
  {
    title: "Bluesky",
    href: "https://bsky.app/profile/fleepy.tv",
    icon: "img/icons/bluesky.png",
    bgColor: "#1da1f2",
    textColor: "white",
    badgeUrl: "/img/badges/bluesky.gif",
  },
  {
    title: "Twitch",
    href: "https://twitch.tv/flleeppyy",
    icon: "img/icons/twitch.png",
    bgColor: "#5e3b9c",
    textColor: "white",
    badgeUrl: "/img/buttons/twitch.png",
  },
  {
    title: "Telegram",
    href: "https://t.me/flleeppyy",
    icon: "img/icons/telegram.png",
    bgColor: "white",
    textColor: "black",
    badgeUrl: "/img/buttons/telegram.png",
  },
  {
    title: "Tumblr",
    href: "https://flleeppyy.tumblr.com",
    icon: "img/icons/tumblr.png",
    bgColor: "#36465d",
    textColor: "white",
    iconCss: "border-radius: 100%",
    badgeUrl: "/img/buttons/tumblr.png",
  },
  {
    title: "YouTube",
    href: "https://u.fleepy.tv/youtube",
    icon: "img/icons/youtube.png",
    bgColor: "#ff1111",
    textColor: "white",
    badgeUrl: "/img/buttons/youtube.png",
  },
  {
    title: "Steam",
    href: "https://steamcommunity.com/id/flleeppyy/",
    icon: "img/icons/steam.png",
    bgColor: "white",
    textColor: "black",
    badgeUrl: "/img/buttons/steam.png",
  },
  {
    title: "GitHub",
    href: "https://github.com/flleeppyy",
    icon: "img/icons/github.png",
    bgColor: "#111213",
    textColor: "white",
    badgeUrl: "/img/buttons/github.png",
  },
  {
    title: "Business Email",
    href: "mailto:flleeppyybusiness@gmail.com",
    icon: "img/icons/email.png",
    bgColor: "white",
    textColor: "#111213",
    badgeUrl: "/img/buttons/email.png",
  },
];

export default (app: FastifyInstance) => {
  app.get("/api/links", (req, res) => {
    res.send({
      links,
    });
  });
};
