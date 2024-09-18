// import cluster from 'cluster';
// import * as os from 'os';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import expressListRoutes from 'express-list-routes';
import http from 'http';
import path from 'path';
import { corsOptions } from './config/cors.config';
import { globalLimiterOptions } from './config/globalRateLimiter.config';
import { testRouter } from './routes/test.routes';
import setupSockerServer from './utils/setupSocketServer';
import { connectMongoose } from './db/clients/mongo.client';

// const numCPUs = os.cpus().length

const server = () => {
  // if (cluster?.isPrimary) {
  //     console.log(`Master ${process.pid} is running`)

  //     // Fork workers.
  //     for (let i = 0; i < numCPUs; i++) {
  //         cluster.fork()
  //     }

  //     cluster.on('exit', (worker) => {
  //         console.log(`worker ${worker.process.pid} died`)
  //     });
  // } else {
  try {
    const app = express();
    const server = http.createServer(app);
    const PORT = process.env.PORT || 4003;

    // parse application/x-www-form-urlencoded
    app.use(express.urlencoded({ extended: true }));

    // parse application/json
    app.use(express.json());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // CORS protection
    app.use(cors(corsOptions));

    // For security purposes
    app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

    // serve static files
    app.use('/', express.static(path.join(__dirname, '/public')));

    //rate limiter
    app.use(globalLimiterOptions);

    connectMongoose()

    // connect to socket server
    setupSockerServer(server);

    // const jwtMiddleware = new JwtMiddleware();
    // ROUTES
    // test router. for development purposes only
    app.use('/user/api/v1/test', testRouter);
    // routes
    // app.use('/user/api/v1/test', testRouter);

    app.all('*', (req, res) => {
      console.log('here', req);
      res.status(404);
      if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
      } else if (req.accepts('application/json')) {
        res.json({ error: '404 Not Found' });
      } else {
        res.type('txt').send('404 Not Found');
      }
    });

    // List down all routes in the terminal on startup
    expressListRoutes(app, { prefix: '/' });

    app.listen(PORT, () => {
      console.log(`Worker ${process.pid} started on port ${PORT}`);
    });
  } catch (error) {
    console.log('Error', error);
  }
  // }
};

server();
