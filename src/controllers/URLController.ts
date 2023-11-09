import { NextFunction, Request, Response } from 'express';
import Controller from '../decorators/Controller';
import Get from '../decorators/routes/Get';
import Post from '../decorators/routes/Post';
import { Service } from 'typedi';
import URLModel from '../database/models/URL';
import { generate } from 'shortid';
import UrlInterface from '../interfaces/UrlInterface';
import DefaultError from '../errors/DefaultError';

@Controller('/url')
@Service()
export class UrlController {
  @Get('/hello')
  public async hello(_req: Request, res: Response): Promise<void> {
    const statusCode = 200;
    const message = 'Hello world';
    res.status(statusCode).send({
      statusCode,
      message,
    });
  }
  @Get('/:id')
  public async getUrl(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const id = <string>req.params['id'];
      const url: UrlInterface = <UrlInterface>await URLModel.findOne({
        short: id,
      });
      if (!url) {
        const message = 'Could not find the url ';
        const statusCode = 404;
        throw new DefaultError(message, statusCode);
      }
      res.redirect(url.originalUrl);
    } catch (err: any) {
      debugger;
      next(err);
    }
  }
  @Post('/new')
  public async shortUrl(req: Request, res: Response): Promise<void> {
    try {
      const originalUrl = <string>req.query.url;
      const date = Date.now();
      const shortenUrl = generate();
      await URLModel.create({
        originalUrl,
        date,
        short: shortenUrl,
      });
      res.status(200).json({
        original: originalUrl,
        shortenUrl,
        message: 'Sucessfuly create a new url',
        status: 200,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  }
}
