"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
let users = [];
try {
    const data = fs_1.default.readFileSync("./data/users.json", "utf-8");
    users = JSON.parse(data);
}
catch (error) {
    console.error("Error reading or parsing users.json:", error);
}
const userLogin = (username, password) => {
    const user = users.find((user) => user.username === username && user.password === password);
    if (user) {
        return { login: true, userObject: user };
    }
    return { login: false, userObject: null };
};
exports.default = userLogin;
