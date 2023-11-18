import express from 'express';
import DB from './database/config';
import './controllers';
import AppRouter from './Router';
import { errorHandler } from './middlewares/ErroHandler';
import path = require('path');
import cors from 'cors';
import notFoundMiddleware from './middlewares/NotFoundMiddleware';

DB.on(
  'error',
  console.log.bind(console, 'An error occurred during the connection'),
);
DB.once('open', () => console.log('Database connection successfuly'));

const app = express();

const corsOption = {
  origin: '*',
};

app.use(cors(corsOption));
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, '../public')));

app.use(AppRouter);
app.use(errorHandler);
app.use(notFoundMiddleware);

export default app;
