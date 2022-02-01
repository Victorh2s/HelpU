import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config();

import './src/database';
import express from 'express';
import cors from 'cors';
import delay from 'express-delay';
import HomeRoutes from './src/routes/homeroutes';
import usersroutes from './src/routes/usersroutes';
import tokenroutes from './src/routes/tokenroutes';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(delay(2000));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, 'uploads')));
  }

  routes() {
    this.app.use(cors());
    this.app.use('/', HomeRoutes);
    this.app.use('/users/', usersroutes);
    this.app.use('/tokens', tokenroutes);
  }
}

export default new App().app;
