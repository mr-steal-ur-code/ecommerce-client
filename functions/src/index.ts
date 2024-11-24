import express, { Request, Response } from "express";
import cors from "cors";
import fs from "fs";
import { loginHandler } from "./utils/loginHandler";
import { onRequest } from "firebase-functions/v2/https";

const app = express();
const productsPath = "./data/products.json";
const usersPath = "./data/users.json";

let products: Product[] = [];
let users: User[] = [];
try {
  products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));
} catch (error) {
  console.error("Error reading products file:", error);
}

try {
  users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));
} catch (error) {
  console.error("Error reading users file:", error);
}

app.use(cors());
app.use(express.json());

app.get("/products", (_req: Request, res: Response) => {
  if (!products.length) {
    res.status(500).send({ error: "Products data not available" });
  }
  res.status(200).send(products);
});

app.get("/users", (req: Request, res: Response) => {
  if (!users.length) {
    res.status(500).send({ error: "Users data not available" });
  }
  res.status(200).send(users);
})

app.post("/login", (req: Request, res: Response) => {
  const { username, password } = req?.body || { email: "", password: "" };
  console.log("user-pass:", username, password);
  const loginRes = loginHandler(username, password);
  if (typeof loginRes === "string") {
    res.status(500).send(loginRes)
  } else res.status(200).send(loginRes)
});

const api = onRequest({ memory: "256MiB" }, app);

export { api }