import { Request, Response } from 'express';
import DefaultError from '../errors/DefaultError';
import { NextFunction } from 'express';

export const errorHandler = (
  err: DefaultError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof DefaultError) {
    return err.sendResponse(req, res);
  }
};
