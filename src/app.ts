import express from 'express';
import DB from './database/config';
import './controllers';
import AppRouter from './Router';
import { errorHandler } from './middlewares/ErroHandler';

DB.on(
  'error',
  console.log.bind(console, 'An error occurred during the connection'),
);
DB.once('open', () => console.log('Database connection successfuly'));

const app = express();
app.use(express.json());

app.use(AppRouter);
app.use(errorHandler);

export default app;
