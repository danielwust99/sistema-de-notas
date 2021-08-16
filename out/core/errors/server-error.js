"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerError = void 0;
class ServerError extends Error {
    constructor() {
        super("Internal Server error");
        this.name = "ServerError";
    }
}
exports.ServerError = ServerError;
