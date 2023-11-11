import { Request, Response } from 'express';
import DefaultError from '../errors/DefaultError';
import { NextFunction } from 'express';

export const errorHandler = (
  err: DefaultError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = <number>err.statusCode;
  const message = <string>err.message;
  res.status(statusCode).send({
    message,
    statusCode,
  });
};
