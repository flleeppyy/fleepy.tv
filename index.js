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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const fastify_static_1 = __importDefault(require("fastify-static"));
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
console.log(process.env.PORT);
const port = (_a = Number(process.env.PORT)) !== null && _a !== void 0 ? _a : 8001;
const app = fastify_1.default({
    trustProxy: true,
});
app.addHook("onRequest", (req, _, next) => {
    console.log(`IP: ${req.headers['cf-connecting-ip'] || req.ip} Requested ${req.url}`);
    next();
});
app.register(fastify_static_1.default, {
    root: path_1.default.join(__dirname, "public"),
    wildcard: true,
});
app.setNotFoundHandler((req, res) => {
    res.header('Content-Type', 'text/html');
    res.type('text/html');
    return res.status(404).send(fs.readFileSync(path_1.default.join(__dirname, 'errors/404.html')));
});
app.listen(port, '0.0.0.0', () => console.log(`listening at http://localhost:${port}`));
