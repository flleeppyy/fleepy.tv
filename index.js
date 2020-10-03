"use strict";
// you may be asking, why the fuck did you run your front end on node when nginx can just provide the files without a server in the /var/www directory?
// because fuck you thats why
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fastify_1 = __importDefault(require("fastify"));
var fastify_static_1 = __importDefault(require("fastify-static"));
var cheerio_1 = __importDefault(require("cheerio"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var port = 8001;
var app = fastify_1["default"]({
    trustProxy: true
});
app.addHook("onRequest", function (req, _, next) {
    console.log("IP: " + req.ip + " Requested " + req.url); // just do some logging
    next();
});
// app.setNotFoundHandler((req, res) => {
//   res.sendFile('fuckywucky.html')
// })
app.register(fastify_static_1["default"], {
    root: path_1["default"].join(__dirname, "public"),
    wildcard: "/**"
});
// Other files and shit
app.get("/cirnobot/strings.json", function (_req, res) {
    var html = "";
    var styleNode = "<style>body { white-space: pre }</script>";
    var contribution = '<p>Submit Cirno quotes <a href="https://u.fleepy.tv/cirnobotquotesubmission">here!</a></p>';
    try {
        html = fs_1["default"].readFileSync("/mnt/botimagestorage/cirnobot/strings.json", "utf-8");
    }
    catch (e) {
        console.log("done a fucky wucky, error on /cirnobot/strings.json");
        console.error(e);
        html = "\n      <body>\n        <p>Unable to load the quotes.</p>\n      </body>\n    ";
    }
    var $ = cheerio_1["default"].load(html);
    $("body").prepend(contribution);
    $("body").append(styleNode);
    res.header("Content-Type", "text/html").send($.html());
});
app.listen(port, function () { return console.log("listening at http://localhost:" + port); }); // listen the server, make it live
