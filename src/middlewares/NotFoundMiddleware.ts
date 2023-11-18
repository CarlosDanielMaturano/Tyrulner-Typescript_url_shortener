import { Request, Response } from 'express';
import HttpsStatusCode from '../utils/HttpsStatusCode';
const notFoundMiddleware = (req: Request, res: Response) => {
  const statusCode = HttpsStatusCode.NOT_FOUND;
  const message = 'Sorry, we cant find what are you looking for';
  if (req.accepts('text/html')) {
    return res.redirect('/static/notFound.html');
  }
  return res.status(statusCode).json({
    statusCode,
    message,
  });
};

export default notFoundMiddleware;
