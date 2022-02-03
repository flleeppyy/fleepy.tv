class Link {
  title: string;
  href: string;
  icon: string; // icon must be a 1:1 ratio and perfectly hitting the edges of the icon
  bgColor: string;
  textColor: string;
  iconCss: string;
  
  constructor (title?:string, href?:string, icon?:string, bgColor?:string, textColor?:string, iconCss?:string) {
    this.title = title || "Title";
    this.href = href || "https://fleepy.tv";
    this.icon = icon || "img/icons/questionmark.png";
    this.bgColor = bgColor || "white" || "#ffffff";
    this.textColor = textColor || "black" || "#000000";
    this.iconCss = iconCss!;
  }

  toJSON() {
    return {
      title: this.title,
      href: this.href,
      icon: this.icon,
      bgColor: this.bgColor,
      textColor: this.textColor,
      iconCss: this.iconCss
    }
  }
}

export default async () => {
  const main = $("main");
  
  const linksApi = await fetch("/api/links");
  const links = (await linksApi.json()).links as Link[];
  links.forEach(link => {
    const button = $(`<button href="${link.href}" class="dropshadow"><img alt="${link.title}" src="${link.icon}" ${link.iconCss ? `style="${link.iconCss}"` : ""}><div class="linkTitle"><p>${link.title}</p></div></button>`);
    // console.log(button)
    button.attr("onclick", `window.location = '${link.href}'`);
    // button.attr('onclick', `console.log(this, event)`)
    button.css({
      "background": link.bgColor || "white",
      "color": link.textColor || "black"
    });
    button.appendTo("links");
    button.on("mousedown", "a.external", e => {
      e.preventDefault();
      if (link.title === "Business Email") {
        return;
      }
      $("#fallbackContainer").fadeIn(100);
      main.fadeOut(400);
    });
    
    // We have to use normal javascript (not jquery) to add the mouse down listener because JQuery doesn't detect middle click or right click as a click event.
    button[0].addEventListener("mousedown", e => { // fuck you jquery
      if (e.which === 2) {
        e.preventDefault();
        window.open(link.href, "_blank");
      }
    });
  });
  return;
};