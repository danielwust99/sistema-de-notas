"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(require("../../../core/data/connections/Database"));
require("dotenv").config();
const secret = process.env.SECRET_HASH;
async function NetworkCheck(req, res, next) {
    const testeRede = await new Database_1.default().getConnection();
    if (testeRede) {
        return res.json({
            erro: testeRede.erro,
        });
    }
    else {
        next();
    }
}
exports.default = NetworkCheck;
