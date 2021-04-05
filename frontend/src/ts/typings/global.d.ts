interface Window {
  $: JQueryStatic
}

declare let $: Window["$"];

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
}