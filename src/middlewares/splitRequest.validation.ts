import { NextFunction, Request, Response } from 'express';

export function splitRequest(req: Request, res: Response<any>, next: NextFunction) {
  const { request } = req.body;
  const [data, signature] = request.split('.');

  if (data == undefined || signature == undefined) {
      res.status(400).send("Invalid request format. Expected data and signature separated by '.'");
  }
  next();
}