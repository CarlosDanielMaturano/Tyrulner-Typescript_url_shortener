import express from 'express';
import { Express } from 'express-serve-static-core';
import URLModel from '../database/models/URL';

const helloWorld = (req: express.Request, res: express.Response): void => {
  const statusCode = 200;
  const message = 'Hello World';
  res.status(statusCode).json({
    statusCode,
    message,
  });
};

const getModels = async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  const models = await URLModel.find();
  res.status(200).json(models);
};

const postModels = async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  const models = await URLModel.create({
    originalUrl: 'https://google.com',
    shortUrl: 'https://google.com',
    date: new Date(),
  });
  res.status(200).json(models);
};
const routes = (app: Express): void => {
  app.route('/').get(helloWorld);
  app.route('/models').get(getModels);
  app.route('/models').post(postModels);
};

export default routes;
