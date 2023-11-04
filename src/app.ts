import express from 'express';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  const message: string = 'Hello world';
  const statusCode: number = 200;
  res.status(statusCode).json({
    message,
    statusCode,
  });
});

export default app;
