"use strict";
var Hsl = (function () {
    function Hsl(hue, saturation, lightness) {
        this.hue = hue;
        this.saturation = saturation;
        this.lightness = lightness;
        if (this.hue > 360) {
            throw new Error("Hue must be less than or equal to 360.");
        }
        if (this.saturation > 100) {
            throw new Error("Saturation must be less than or equal to 100.");
        }
        if (this.lightness > 100) {
            throw new Error("Lightness must be less than or equal to 100.");
        }
    }
    Hsl.prototype.toString = function () {
        return "hsl(" + this.hue + ", " + this.saturation + "%, " + this.lightness + "%)";
    };
    Hsl.prototype.toHSLA = function (alpha) {
        alpha = alpha || 100;
        if (alpha > 100) {
            throw new Error('Alpha cannot be greater than 100%');
        }
        return "hsl(" + this.hue + ", " + this.saturation + "%, " + this.lightness + ", " + alpha + ")";
    };
    return Hsl;
}());
var Link = (function () {
    function Link(title, href, icon, bgColor, textColor, iconCss) {
        this.title = title || "Title";
        this.href = href || "https://fleepy.tv";
        this.icon = icon || "img/icons/questionmark.png";
        this.bgColor = bgColor || "white" || "#ffffff";
        this.textColor = textColor || "black" || "#000000";
        this.iconCss = iconCss;
    }
    return Link;
}());
$.fn.randomize = function (selector) {
    (selector ? this.find(selector) : this).parent().each(function () {
        $(this).children(selector).sort(function () {
            return Math.random() - 0.5;
        }).detach().appendTo(this);
    });
    return this;
};
$(function () {
    var main = $('main');
    var wdipitt = $('#whydidiputinthisthing');
    var bgNotice = $('#backgroundOnlyNotice');
    $('html').css('background', 'none');
    $('#chen').on('click', function (e) {
        if (e.ctrlKey) {
            bgNotice.fadeIn(400);
            setTimeout(function () {
                bgNotice.fadeOut(400);
            }, 1100);
            return wdipitt.fadeOut(200);
        }
        $("links").randomize("button");
    });
    var isMouseDown = false;
    $("#chen").on('mousedown', function (e) {
        isMouseDown = true;
        setTimeout(function () {
            if (isMouseDown) {
                bgNotice.fadeIn(400);
                setTimeout(function () {
                    bgNotice.fadeOut(400);
                }, 1100);
                return wdipitt.fadeOut(200);
            }
        }, 1000);
    });
    $("#chen").on('mouseup', function (e) {
        isMouseDown = false;
    });
    main.on('mousedown', function () {
        wdipitt.fadeIn(200);
    });
    $(document).on('keydown', function () {
        wdipitt.fadeIn(200);
    });
    (function () {
        var subtitles = [
            "some irrelevant",
            "yes im stupid",
            "this page is badly coded. seriously, look at the <a href='https://github.com/flleeppyy/fleepy.tv'>repo</a>.",
            "yeah i make music, but is it good?",
            "bad coding practices all around",
            "i like synthesizers",
            "i want a Mother 32 and a DFAM",
            "i love chen :3",
            "i absolutely adore chen",
            "chen is very cute!",
            "<a href='https://twitter.com/htfcirno2000'>htfcirno2000</a> is very awesome :3",
            "<a href='https://twitter.com/smolespi'>Espi</a> is very cool, talented, and awesome c:",
            "cheeeeeeeeeeeeeeeeen",
            "CHEN!",
            "wish i could downloadmoreram.com",
            "do you ever just feel like afdlkajshdfkajwefiueafhiew woefhawefijw",
            "yes i have a screwed up sleep schedule",
            "uwu?",
            "owo",
            "òwó",
            "I spend my time not watching anime, but writing bad code",
            "my music is the definition of hot garbage",
            "hot garbage",
            "did you know, if you stop thinking, you wont be able to think?",
            "god i love yuri, most beautiful thing ever, girls in bliss",
            "cute and stupid.",
            "h"
        ];
        var ST = $('#subtitle');
        var prevST;
        var setST = function () {
            var a = Math.floor(Math.random() * subtitles.length);
            var b = subtitles[a];
            if (a === prevST) {
                return setST();
            }
            prevST = a;
            ST.html(b);
        };
        setST();
        ST.on('click', function () {
            setST();
        });
    })();
    var setArcZI = setInterval(function () {
        var f = function () { $('#arc-widget-container').attr('style', $('#arc-widget-container').attr('style') + " z-index:2!important;"); };
        if ($('#arc-widget-container').length > 0) {
            setTimeout(function () { f(); return clearInterval(setArcZI); }, 300);
        }
        f();
    }, 50);
    var links = [
        new Link("Bandcamp", "https://flleeppyy.bandcamp.com/", "img/icons/bandcamp.png", "#4B5154", "white"),
        new Link("Spotify", "https://open.spotify.com/artist/5d88PKcv3BK7d4K9LFpPJM", "img/icons/spotify.png", "#1DB954", "white"),
        new Link("Ko-Fi", 'https://ko-fi.com/flleeppyy', "img/icons/kofi.png", "#29abe0", "white"),
        new Link("Twitter", "https://twitter.com/", "img/icons/twitter.png", "#1da1f2", "white"),
        new Link("Telegram", "https://t.me/flleeppyy", "img/icons/telegram.png", "white"),
        new Link("Tumblr", "https://flleeppyy.tumblr.com", "img/icons/tumblr.png", "#36465d", "white", "border-radius: 100%"),
        new Link("YouTube", "https://u.fleepy.tv/youtube", "img/icons/youtube.png", "#ff1111", "white"),
        new Link("Steam", "https://steamcommunity.com/id/flleeppyy/", "img/icons/steam.png", "white", "black"),
        new Link("GitHub", "https://github.com/flleeppyy", "img/icons/github.png", "#111213", "white"),
        new Link("Business Email", "mailto:flleeppyybusiness@gmail.com", "img/icons/email.png", "white", "#111213"),
    ];
    links.forEach(function (link) {
        var button = $("<button href=\"" + link.href + "\" class=\"dropshadow\"><img src=\"" + link.icon + "\" " + (link.iconCss ? "style=\"" + link.iconCss + "\"" : "") + "><div class=\"linkTitle\"><p>" + link.title + "</p></div></button>");
        button.attr('onclick', "window.location = '" + link.href + "'");
        button.css({
            "background": link.bgColor || "white",
            "color": link.textColor || "black"
        });
        button.appendTo('links');
        button.on("mousedown", "a.external", function (e) {
            e.preventDefault();
            if (link.title === "Business Email") {
                return;
            }
            $('#fallbackContainer').fadeIn(100);
            main.fadeOut(400);
        });
        button[0].addEventListener('mousedown', function (e) {
            if (e.which === 2) {
                e.preventDefault();
                window.open(link.href, "_blank");
            }
        });
    });
    var paused = false;
    var fallback = false;
    new Typed('#typeThis', {
        strings: ['^200yarn start^100\r^200\n<strong>`yarn run v1.22.5`</strong>\r\n`$ tsc &amp;&amp; PORT=8001 ts-node .`\r\n^400 `listening at https://fleepy.tv\r\n`'],
        typeSpeed: 40,
        shuffle: true,
        onStringTyped: function () {
            main.fadeIn(400);
            $('#loadingContainer').fadeOut(400);
            wdipitt.fadeIn(400);
            setTimeout(function () {
                if (fallback !== true) {
                    startHue();
                }
                fallback = true;
                wdipitt.css('max-width', '100%');
                wdipitt.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function (event) {
                    wdipitt.css('max-height', '100%');
                    $(this).off(event);
                });
            }, 400);
        },
        onTypingPaused: function () {
            if (paused !== true) {
                $('#process').html('yarn*');
                paused = true;
            }
        }
    });
    $(document).on('keydown', function (e) {
        if (e.key === ' ') {
            if (fallback === true)
                return;
            fallback = true;
            startHue();
            wdipitt.css('transition', 'none');
            $('#loadingContainer').fadeOut(100);
            main.fadeIn(100);
            wdipitt.css('max-width', '100%');
            wdipitt.css('max-height', '100%');
        }
    });
    function startHue() {
        var saturation = 100;
        var interval = 30;
        var hue = 0;
        setInterval(function () {
            (hue >= 360) ? hue = 0 : '';
            hue++;
            $('#chen').css('border', "0.3em solid " + new Hsl(hue, saturation, 90).toString());
            wdipitt.css('border', ("0.3em solid " + new Hsl(hue, 100, 80).toString()));
            $('#name').css('color', new Hsl(hue, saturation, 90).toString());
        }, interval);
    }
    (function () {
        var darkreaderint = 0;
        var darkreader = setInterval(function () {
            if (darkreaderint > 50)
                clearInterval(darkreader);
            if ($('.darkreader').length > 0) {
                $('#anti-darkreader').fadeIn(200);
                clearInterval(darkreader);
            }
        }, 200);
    })();
    $('#morecpinfo').on('click', function (e) {
        e.preventDefault();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQW1CQTtJQU1FLGFBQVksR0FBVSxFQUFFLFVBQWlCLEVBQUUsU0FBZ0I7UUFDekQsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxFQUFFO1lBQ2xCLE1BQU0sSUFBSSxLQUFLLENBQUMsd0NBQXdDLENBQUMsQ0FBQTtTQUMxRDtRQUNELElBQUksSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLEVBQUU7WUFDekIsTUFBTSxJQUFJLEtBQUssQ0FBQywrQ0FBK0MsQ0FBQyxDQUFBO1NBQ2pFO1FBQ0QsSUFBSSxJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsRUFBRTtZQUN4QixNQUFNLElBQUksS0FBSyxDQUFDLDhDQUE4QyxDQUFDLENBQUE7U0FDaEU7SUFDSCxDQUFDO0lBRUQsc0JBQVEsR0FBUjtRQUNFLE9BQU8sU0FBTyxJQUFJLENBQUMsR0FBRyxVQUFLLElBQUksQ0FBQyxVQUFVLFdBQU0sSUFBSSxDQUFDLFNBQVMsT0FBSSxDQUFBO0lBQ3BFLENBQUM7SUFFRCxvQkFBTSxHQUFOLFVBQU8sS0FBYTtRQUNsQixLQUFLLEdBQUcsS0FBSyxJQUFJLEdBQUcsQ0FBQTtRQUNwQixJQUFJLEtBQUssR0FBRyxHQUFHLEVBQUU7WUFDZixNQUFNLElBQUksS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7U0FDdEQ7UUFDRCxPQUFPLFNBQU8sSUFBSSxDQUFDLEdBQUcsVUFBSyxJQUFJLENBQUMsVUFBVSxXQUFNLElBQUksQ0FBQyxTQUFTLFVBQUssS0FBSyxNQUFHLENBQUM7SUFDOUUsQ0FBQztJQUNILFVBQUM7QUFBRCxDQUFDLEFBaENELElBZ0ND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