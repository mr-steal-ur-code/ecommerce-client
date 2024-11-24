import express, { Request, Response } from "express";
import cors from "cors";
import fs from "fs";
import { loginHandler } from "./utils/loginHandler";
import { onRequest } from "firebase-functions/v2/https";

const app = express();
const productsPath = "./data/products.json";
const usersPath = "./data/users.json";

let products: Product[] = [];
try {
  products = JSON.parse(fs.readFileSync(productsPath, "utf-8"))?.data;
} catch (error) {
  console.error("Error reading products file:", error);
}

let users: User[] = [];

try {
  users = JSON.parse(fs.readFileSync(usersPath, "utf-8"))?.data;
} catch (error) {
  console.error("Error reading users file:", error);
}

app.use(cors());
app.use(express.json());

app.get("/products", (_req: Request, res: Response) => {
  if (!products.length) {
    res.status(500).send({ error: "Products data not available" });
  } else res.status(200).send(products);
});

app.get("/products/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  if (!products.length) {
    res.status(500).send({ error: "Product data not available" });
  } else res.status(200).send(products.filter((product) => product?.id == Number(id)));
});

app.get("/users", (req: Request, res: Response) => {
  if (!users.length) {
    res.status(500).send({ error: "Users data not available" });
  } else res.status(200).send(users);
});

app.get("/users/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  if (!users.length) {
    res.status(500).send({ error: "User data not available" });
  } else res.status(200).send(users.filter((user) => user?.id == id));
});

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