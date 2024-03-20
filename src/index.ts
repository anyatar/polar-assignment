import express, { Application } from "express";
import router from './routes';

export default class Server {
  constructor(app: Application) {
    this.config(app);
  }

  private config(app: Application): void {
    
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/', router);
  }
}
