"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config({ path: "./.env" });
const server_1 = __importDefault(require("./models/server"));
const db_1 = require("./db");
void (0, db_1.connectDb)();
const server = new server_1.default();
server.execute();
server.server.listen(server.port, () => {
    console.log('server started in http://localhost:8080');
});
