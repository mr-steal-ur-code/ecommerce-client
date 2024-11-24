"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginHandler = void 0;
const login_1 = __importDefault(require("./login"));
const loginHandler = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    if (req.method === "POST") {
        let requestBody = "";
        req.on("data", (chunk) => {
            requestBody += chunk.toString();
        });
        req.on("end", () => {
            try {
                const parsedBody = JSON.parse(requestBody);
                const username = parsedBody.username;
                const password = parsedBody.password;
                const { login, userObject } = (0, login_1.default)(username, password);
                if (login) {
                    res.status(200).json(userObject);
                    console.log(`${new Date()} - Login is successful`);
                }
                else {
                    res.status(403).json({ message: "Invalid Credentials" });
                    console.log(`${new Date()} - Invalid login credentials`);
                }
            }
            catch (error) {
                res.status(400).json({ message: "Invalid request body" });
                console.error(`${new Date()} - Error parsing request body:`, error);
            }
        });
        req.on("error", (err) => {
            res.status(500).json({ message: "Internal server error" });
            console.error(`${new Date()} - Request error:`, err);
        });
    }
    else {
        res.status(404).json({ message: "Route not found" });
        console.log(`${new Date()} - Route not found`);
    }
};
exports.loginHandler = loginHandler;
