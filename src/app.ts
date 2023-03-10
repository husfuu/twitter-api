import express from 'express';
import { Routes } from '@/interfaces/routes.interface';
import { logger, stream } from '@/utils/logger';
import morgan from 'morgan';
// import helmet from 'helmet';
import hpp from 'hpp';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@/config';

class App {
    public app: express.Application;
    public env: string;
    public port: string | number;

    constructor(routes: Routes[]) {
        this.app = express();
        this.env = NODE_ENV || 'development';
        this.port = PORT || 3000;
        this.initializeRoutes(routes);
        this.initializeMiddlewares()
    }

    public listen() {
        this.app.listen(this.port, () => {
            logger.info(`=================================`);
            logger.info(`======= ENV: ${this.env} =======`);
            logger.info(`🚀 App listening on the port ${this.port}`);
            logger.info(`=================================`);
        })
    }

    private initializeRoutes(routes: Routes[]) {
        routes.forEach(route => {
            this.app.use('/', route.router)
        })
    }

    private initializeMiddlewares() {
        this.app.use(morgan(LOG_FORMAT, { stream }));
        this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
        this.app.use(hpp());
        this.app.use(compression());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
    }

}

export default App;