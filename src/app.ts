import express from 'express';
import DB from './database/config';
import routes from './routes';

const app = express();
app.use(express.json());

DB.on(
  'error',
  console.log.bind(console, 'An error occurred during the connection'),
);
DB.once('open', () => console.log('Database connection successfuly'));

routes(app);

export default app;
