"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const loginHandler_1 = require("./utils/loginHandler");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const productsPath = process.env.PRODUCTS_FILE || "./data/products.json";
const usersPath = process.env.USERS_FILE || "./data/users.json";
let products = [];
let users = [];
try {
    products = JSON.parse(fs_1.default.readFileSync(productsPath, "utf-8"));
}
catch (error) {
    console.error("Error reading products file:", error);
}
try {
    users = JSON.parse(fs_1.default.readFileSync(usersPath, "utf-8"));
}
catch (error) {
    console.error("Error reading users file:", error);
}
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/products", (_req, res) => {
    if (products) {
        res.status(500).send({ error: "Products data not available" });
    }
    res.status(200).send(products);
});
app.get("/users", (req, res) => {
    if (users) {
        res.status(500).send({ error: "Users data not available" });
    }
    res.status(200).send(users);
});
app.post("/login", (req, res) => {
    (0, loginHandler_1.loginHandler)(req, res);
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
