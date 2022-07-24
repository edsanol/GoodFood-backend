"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../utils/jwt");
class Socket {
    constructor(io) {
        this.io = io;
        this.socketEvent();
    }
    socketEvent() {
        this.io.on('connection', (socket) => __awaiter(this, void 0, void 0, function* () {
            console.log('Client connected');
            const [check, id] = (0, jwt_1.checkJWT)(socket.handshake.query['x-token']);
            if (!check) {
                console.log('client not valid');
                return socket.disconnect();
            }
            socket.join(id);
            socket.on('successOrder', (data) => {
                console.log(data.to);
                this.io.to(data.to).emit('sendNotification');
            });
            socket.on('disconnect', () => {
                console.log('client disconnected', id);
            });
        }));
    }
}
exports.default = Socket;
