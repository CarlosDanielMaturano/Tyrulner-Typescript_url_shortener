import { Request, Response } from 'express';
import DefaultError from '../errors/DefaultError';
import { NextFunction } from 'express';
import InternalServerError from '../errors/InternalServerError';
import NotFoundError from '../errors/NotFoundError';

export const errorHandler = (
  err: DefaultError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof InternalServerError) {
    console.trace(err);
    return err.sendResponse(req, res);
  }
  if (err instanceof DefaultError) {
    return err.sendResponse(req, res);
  }
};
