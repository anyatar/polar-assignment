import { Request, Response } from "express";

export function welcome(req: Request, res: Response): Response {
  console.log("Welcome to Lets run application");
  return res.json({ message: "Welcome to Let's Run application!" });
}

