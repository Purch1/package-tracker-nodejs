import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import { appRouter } from './routes/index.js';
import { errorHandlingMiddleware, handleInvalidRoutes } from './middleware/index.js';
import { setupSwagger } from '../config/swagger.config.js';

const app = express();

app.use(helmet());

const corsOptions = {
  origin: '*',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
};
app.use(cors(corsOptions));

app.use(morgan('dev'));
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', appRouter);

// Set up Swagger
setupSwagger(app);

app.use(handleInvalidRoutes);
app.use(errorHandlingMiddleware);

export default app;
