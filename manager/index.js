"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tslog_1 = require("tslog");
const logger = new tslog_1.Logger();
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const ws_1 = __importDefault(require("ws"));
const child_process_1 = __importDefault(require("child_process"));
// const proc = childProcess.spawn("bedrock_server.exe",{cwd:"./server/"});
const proc = child_process_1.default.spawn("sh", ["./start.sh"], { cwd: "/minecraft/" });
logger.info("Start MC Server - PID: " + proc.pid);
proc.stdout.on('data', (data) => {
    if (data.toString() != "") {
        logger.debug(data.toString());
    }
});
const websocket = ws_1.default.Server;
const wsServer = new websocket({ port: 8080 });
wsServer.on("connection", ws => {
    proc.stdout.on('data', (data) => {
        if (data.toString() != "") {
            ws.send(data.toString());
        }
    });
    ws.on("message", (message) => {
        const json = JSON.parse(message);
        logger.debug(json);
        if (json.type == "start") {
            ws.send("start from server");
        }
        if (json.type == "terminal") {
            proc.stdin.write(json.data + "\n");
        }
    });
});
const server = http_1.default.createServer(function (request, response) {
    console.log(request.url);
    let html = "";
    try {
        html = fs_1.default.readFileSync("./web/" + request.url, 'utf8');
    }
    catch (error) {
        html = "NotFound";
    }
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end(html);
});
server.listen(80);
//# sourceMappingURL=index.js.map