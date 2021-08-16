"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidParam = void 0;
class InvalidParam extends Error {
    constructor(paramName) {
        super(`Erro: ${paramName}`);
        this.name = "InvalidParamError";
    }
}
exports.InvalidParam = InvalidParam;
