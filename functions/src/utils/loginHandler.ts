import { Request, Response } from "express";
import userLogin from "./login";

export const loginHandler = (req: Request, res: Response): void => {
  res.setHeader("Content-Type", "application/json");

  if (req.method === "POST") {
    let requestBody = "";

    req.on("data", (chunk: Buffer) => {
      requestBody += chunk.toString();
    });

    req.on("end", () => {
      try {
        const parsedBody = JSON.parse(requestBody);

        const username: string = parsedBody.username;
        const password: string = parsedBody.password;

        const { login, userObject } = userLogin(username, password);

        if (login) {
          res.status(200).json(userObject);
          console.log(`${new Date()} - Login is successful`);
        } else {
          res.status(403).json({ message: "Invalid Credentials" });
          console.log(`${new Date()} - Invalid login credentials`);
        }
      } catch (error) {
        res.status(400).json({ message: "Invalid request body" });
        console.error(`${new Date()} - Error parsing request body:`, error);
      }
    });

    req.on("error", (err: Error) => {
      res.status(500).json({ message: "Internal server error" });
      console.error(`${new Date()} - Request error:`, err);
    });
  } else {
    res.status(404).json({ message: "Route not found" });
    console.log(`${new Date()} - Route not found`);
  }
};
