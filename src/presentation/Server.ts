import express, { Router } from 'express';
import { PORT } from '../config';

interface Options {
     port?: number;
     routes: Router;
}

export class Server {
     public readonly app = express()
     private readonly port: number;
     private readonly routes: Router;

     constructor(options: Options) {
          const { port = 3500, routes } = options
          this.port = port;
          this.routes = routes;
     }

     async start() {

          //Middlewares
          this.app.use(express.json());
          this.app.use(express.urlencoded({ extended: true }));// x-www-formurlencoded
          const cors = require('cors')
          this.app.use(cors())
          this.app.use((req, res, next) => {
               res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
               res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
               res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
               next();
          });

          this.app.use(this.routes);

          this.app.listen(PORT || 3500, () => {
               console.log(`Server running on port ${PORT}`)
          })
     }
}