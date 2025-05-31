import { Server as WebSocketServer } from "ws";
import http from "http";
import express from "express";
import cors from "cors";
import { handleConnection } from "./websocket";

const app = express();
const port = process.env.PORT || 5000;

process.on("unhandledRejection", (reason, p) =>
    console.error(reason, "Unhandled Rejection at Promise", p)
);
process.on("uncaughtException", err =>
    console.error(err, "Uncaught Exception thrown")
);

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.static(__dirname + "/"));

const server = http.createServer(app);
server.listen(port);
console.log("http server listening on %d", port);

const wss = new WebSocketServer({ server: server });
console.log("websocket server created");

wss.on("connection", ws => handleConnection(ws));
