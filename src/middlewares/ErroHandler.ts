import { Request, Response } from 'express';
import DefaultError from '../errors/DefaultError';

export default function errorHanlder(
  err: DefaultError,
  req: Request,
  res: Response,
) {
  console.log('req', req);
  res
    .status(err.statusCode)
    .send({ message: DefaultError.getErrorMessages(err) });
}
