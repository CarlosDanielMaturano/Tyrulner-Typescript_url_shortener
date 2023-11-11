import { NextFunction, Request, Response } from 'express';
import Controller from '../decorators/Controller';
import Get from '../decorators/routes/Get';
import Post from '../decorators/routes/Post';
import { Service } from 'typedi';
import URLModel from '../database/schemas/URL';
import { generate } from 'shortid';
import UrlInterface from '../interfaces/UrlInterface';
import DefaultError from '../errors/DefaultError';
import UrlChecker from '../utils/urlChecker';
import HttpsStatusCode from '../utils/HttpsStatusCode';

@Controller('/api')
@Service()
export class UrlController {
  @Get('/hello')
  public async hello(_req: Request, res: Response): Promise<void> {
    const statusCode = HttpsStatusCode.OK;
    const message = 'Hello world';
    res.status(statusCode).send({
      statusCode,
      message,
    });
  }
  @Get('/:short')
  public async getUrl(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const short = <string>req.params['short'];
      const url: UrlInterface = <UrlInterface>await URLModel.findOne({
        short,
      });
      if (!url) {
        return next(
          new DefaultError(
            'Could not find the url with the given shorten url',
            404,
          ),
        );
      }
      res.redirect(url.originalUrl);
    } catch (err: unknown) {
      next(err);
    }
  }
  @Post('/new')
  public async shortenUrl(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const originalUrl = <string>req.body.url;

      if (!originalUrl)
        next(new DefaultError('url not given', HttpsStatusCode.BAD_REQUEST));

      if (!UrlChecker.checkUrl(originalUrl)) {
        return next(
          new DefaultError(
            'the providen url is not a valid one',
            HttpsStatusCode.BAD_REQUEST,
          ),
        );
      }
      // Generate a new id from shortid
      const shortenUrl = generate();
      const date = Date.now();

      await URLModel.create({
        originalUrl,
        date,
        short: shortenUrl,
      });

      res.status(HttpsStatusCode.CREATED).json({
        original: originalUrl,
        shorten: shortenUrl,
        message: 'Sucessfuly create a new url',
        statusCode: HttpsStatusCode.CREATED,
      });
    } catch (err: unknown) {
      next(err);
    }
  }
}
