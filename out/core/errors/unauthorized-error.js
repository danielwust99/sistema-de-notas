"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unauthorized = void 0;
class Unauthorized extends Error {
    constructor(paramName) {
        super(`Unauthorized: ${paramName}`);
        this.name = "Unauthorized";
    }
}
exports.Unauthorized = Unauthorized;
