"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fastify_1 = __importDefault(require("fastify"));
var fastify_static_1 = __importDefault(require("fastify-static"));
var fs = __importStar(require("fs"));
var path_1 = __importDefault(require("path"));
var envPort = Number(process.env.PORT);
var port = (envPort === NaN) ? envPort : 8001;
var app = fastify_1.default({
    trustProxy: true,
});
app.addHook("onRequest", function (req, _, next) {
    console.log("IP: " + (req.headers['cf-connecting-ip'] || req.ip) + " Requested " + req.url);
    next();
});
app.register(fastify_static_1.default, {
    root: path_1.default.join(__dirname, "public"),
    wildcard: true,
});
app.setNotFoundHandler(function (req, res) {
    res.header('Content-Type', 'text/html');
    res.type('text/html');
    return res.status(404).send(fs.readFileSync(path_1.default.join(__dirname, 'errors/404.html')));
});
app.listen(port, '0.0.0.0', function () { return console.log("listening at http://localhost:" + port); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxvREFBNkI7QUFDN0Isa0VBQTBDO0FBQzFDLHFDQUF3QjtBQUN4Qiw4Q0FBdUI7QUFFdkIsSUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDeEMsSUFBTSxJQUFJLEdBQUcsQ0FBQyxPQUFPLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFBO0FBRS9DLElBQU0sR0FBRyxHQUFHLGlCQUFPLENBQUM7SUFDbEIsVUFBVSxFQUFFLElBQUk7Q0FDakIsQ0FBQyxDQUFBO0FBRUYsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsVUFBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLElBQUk7SUFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRSxvQkFBYyxHQUFHLENBQUMsR0FBSyxDQUFDLENBQUE7SUFDcEYsSUFBSSxFQUFFLENBQUE7QUFDUixDQUFDLENBQUMsQ0FBQTtBQUVGLEdBQUcsQ0FBQyxRQUFRLENBQUMsd0JBQWEsRUFBRTtJQUMxQixJQUFJLEVBQUUsY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDO0lBQ3BDLFFBQVEsRUFBRSxJQUFJO0NBQ2YsQ0FBQyxDQUFBO0FBRUYsR0FBRyxDQUFDLGtCQUFrQixDQUFDLFVBQUMsR0FBRyxFQUFFLEdBQUc7SUFDOUIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDdkMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQTtJQUNyQixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDdkYsQ0FBQyxDQUFDLENBQUE7QUFDRixHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUNBQWlDLElBQU0sQ0FBQyxFQUFwRCxDQUFvRCxDQUFDLENBQUEifQ==