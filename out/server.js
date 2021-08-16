"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(require("./core/data/connections/Database"));
const App_1 = __importDefault(require("./core/presentation/App"));
const dotenv_1 = __importDefault(require("dotenv"));
require("reflect-metadata");
dotenv_1.default.config({
    path: "./../.env",
});
new Database_1.default()
    .openConnection()
    .then((_) => {
    const app = new App_1.default();
    const port = process.env.PORT || '8080';
    app.init();
    app.start(parseInt(port));
})
    .catch(console.error);
