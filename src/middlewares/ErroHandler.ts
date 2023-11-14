import { Request, Response } from 'express';
import DefaultError from '../errors/DefaultError';
import { NextFunction } from 'express';
import InternalServerError from '../errors/InternalServerError';

export const errorHandler = (
  err: DefaultError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof InternalServerError) {
    console.trace(err);
  }
  if (err instanceof DefaultError) {
    return err.sendResponse(req, res);
  }
};
