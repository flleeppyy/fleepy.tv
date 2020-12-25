// FYI, THIS IS COMPILED TYPESCRIPT IF IT ENDS IN .JS
// note to self, dont use quotes or double quotes in scripts. it fucks with Reindent Lines in vscode
/**
* Throughout the script, you'll see a few self initiated functions or whatever the fuck you want to call them.
* they look like this: (() => { ... })()
* This is to keep the scopes seperated for certain things.
* I just get overly paranoid about accidentally mixing up variable and function names.
* 9 * / 10 i always forget the ending curly brackets and i always wonder why some shit doesnt work
*/
/**
 * @param {hue} hue
 * @param {Percentage..String} saturation
 * @returns {String}
 */
var Hsl = /** @class */ (function () {
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
var Link = /** @class */ (function () {
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
// @ts-ignore
$.fn.randomize = function (selector) {
    (selector ? this.find(selector) : this).parent().each(function () {
        // @ts-ignore
        $(this).children(selector).sort(function () {
            return Math.random() - 0.5;
        }).detach().appendTo(this);
    });
    return this;
};
$(function () {
    var main = $('main');
    $('html').css('background', 'none');
    (function () {
    })();
    $('#chen').on('click', function () {
        //@ts-ignore
        $("links").randomize("button");
    });
    (function () {
        var subtitles = ["some irrelevant", "yes im stupid", "this page is badly coded. seriously, look at the <a href='https://github.com/flleeppyy/fleepy.tv'>repo</a>.", "yeah i make music, but is it good?", "bad coding practices all around", "i like synthesizers", "i want a Mother 32 and a DFAM", "i love chen :3", "i absolutely adore chen", "chen is very cute!", "htfcirno2000 is very awesome", "cheeeeeeeeeeeeeeeeen"];
        var ST = $('#subtitle');
        var setST = function () { return ST.html(subtitles[Math.round(Math.random() * subtitles.length)]); };
        setST();
        ST.on('click', function () {
            setST();
        });
    })();
    // All this does is check every 50ms to see if Arc loaded, then set the z-index to a not retardedly high number.
    // this is simply to hide it on the terminal screen. It shows once the terminal is gone. purely asthetic
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
        new Link("Twitter", "https://twitter.com/", "img/icons/twitter.png", "#1da1f2", "white"),
        new Link("Tumblr", "https://flleeppyy.tumblr.com", "img/icons/tumblr.png", "#36465d", "white", "border-radius: 100%"),
        new Link("YouTube", "https://u.fleepy.tv/youtube", "img/icons/youtube.png", "#ff1111", "white"),
        new Link("Discord", "https://u.fleepy.tv/discord", "img/icons/discord.png", "#7289DA", "white"),
        new Link("GitHub", "https://github.com/github", "img/icons/github.png", "#111213", "white"),
        new Link("Business Email", "mailto:flleeppyybusiness@gmail.com", "img/icons/email.png", "white", "#111213"),
    ];
    links.forEach(function (link) {
        var button = $("<button><img src=\"" + link.icon + "\" " + (link.iconCss ? "style=\"" + link.iconCss + "\"" : "") + "><div class=\"linkTitle\"><p>" + link.title + "</p></div></button>");
        button.attr('onclick', "window.location = '" + link.href + "'");
        button.css({
            "background": link.bgColor || "white",
            "color": link.textColor || "black"
        });
        button.appendTo('links');
        var businessEmail = "Business Email";
        if (link.title === businessEmail) {
            // button.children('p').css({"font-size": ".9em"})
        }
        button.on('click', function (e) {
            e.preventDefault();
            if (link.title === businessEmail) {
                return;
            }
            $('#fallbackContainer').fadeIn(100);
            main.fadeOut(400);
        });
    });
    $('#fallbackButton').click(function (e) {
        e.preventDefault();
        window.stop();
        main.fadeIn(400);
        $('#fallbackContainer').fadeOut(400);
        toastr.info('Stopped window loading.');
    });
    var paused = false;
    // @ts-ignore
    var typed = new Typed('#typeThis', {
        strings: ['yarn start^100\r^200\n<strong>`yarn run v1.22.5`</strong>\r\n`$ tsc &amp;&amp; PORT=8001 ts-node .`\r\n^400 `listening at https://fleepy.tv\r\n`'],
        typeSpeed: 40,
        shuffle: true,
        onStringTyped: function () {
            main.fadeIn(400);
            $('#loadingContainer').fadeOut(400);
            var wdipitt = $('#whydidiputinthisthing');
            wdipitt.fadeIn(400);
            setTimeout(function () {
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
                $('');
                wdipitt.css('max-width', '100%');
                // https://stackoverflow.com/questions/18143899/jquery-run-function-after-css-transition-is-done#18144024
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
});
