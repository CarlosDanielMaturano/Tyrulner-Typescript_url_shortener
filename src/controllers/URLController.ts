import Controller from '../decorators/Controller';
import Get from '../decorators/routes/Get';
import Post from '../decorators/routes/Post';
import { Service } from 'typedi';
import URLModel from '../database/schemas/URL';
import UrlInterface from '../interfaces/UrlInterface';
import UrlChecker from '../utils/urlChecker';
import HttpsStatusCode from '../utils/HttpsStatusCode';
import NotFoundError from '../errors/NotFoundError';
import BadRequestError from '../errors/BadRequestError';
import InternalServerError from '../errors/InternalServerError';
import { NextFunction, Request, Response } from 'express';
import formatShortUrl from '../utils/formatShortUrl';
import { generate } from 'shortid';
import genQrDataBuffer from '../utils/genQrcode';

const API_PATH = '/api';

@Controller(API_PATH)
// Service is required for use the typedi Container
@Service()
export class UrlController {
  @Get('/hello')
  public async hello(
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const statusCode = HttpsStatusCode.OK;
      const message = 'Hello world';
      res.status(statusCode).send({
        statusCode,
        message,
      });
    } catch (err) {
      next(err);
    }
  }
  @Get('/all')
  public async getAllUrls(
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const allUrls = await URLModel.find({}, { _id: 0, __v: 0 });
      const statusCode = HttpsStatusCode.OK;
      res.status(statusCode).json({
        urls: allUrls,
        statusCode,
      });
    } catch (err) {
      next(err);
    }
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
        throw new NotFoundError('Could not find the url with the given urlID');
      }
      res.redirect(url.originalUrl);
    } catch (err: unknown) {
      next(err);
    }
  }
  @Get('/inspect/:short')
  public async inspectUrl(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const short = <string>req.params['short'];
      const url: UrlInterface = <UrlInterface>await URLModel.findOne(
        {
          short,
        },
        { _id: 0, __v: 0 },
      );
      if (!url) {
        throw new NotFoundError('Could not find the url with the given urlID');
      }
      const statusCode = HttpsStatusCode.OK;
      res.status(statusCode).json({
        url,
        statusCode,
      });
    } catch (err) {
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
      const originalUrl = <string>req.body['url'];
      const useQrCode = <boolean>req.body['qrCode'];

      if (!originalUrl) throw next(new BadRequestError('url not given'));

      if (!UrlChecker.isValid(originalUrl))
        throw new BadRequestError('the providen url is not a valid one');

      // Generate a new id from shortid
      const shortenUrlId = generate();

      if (await URLModel.findOne({ short: shortenUrlId })) {
        throw new InternalServerError('The given id for the url already exits');
      }

      const date = Date.now();
      const result = await URLModel.create({
        originalUrl,
        date,
        short: shortenUrlId,
      });

      if (!result) {
        throw new InternalServerError('while trying to create a new url');
      }

      const shortUrl = formatShortUrl(req, API_PATH, shortenUrlId);
      const statusCode = HttpsStatusCode.CREATED;
      const message = 'Sucessfuly create a new url';

      interface jsonReturn {
        original: string;
        shortUrl: string;
        message: string;
        statusCode: number;
        qrCodeBufData?: string;
      }

      const jsonReturnData: jsonReturn = {
        original: originalUrl,
        shortUrl,
        message,
        statusCode,
      };

      if (useQrCode) {
        const qrCodeBufData = await genQrDataBuffer(shortUrl);
        if (!qrCodeBufData) {
          throw new InternalServerError('Cant create a buffer fot the QRCode');
        }
        jsonReturnData.qrCodeBufData = qrCodeBufData;
      }

      res.status(statusCode).json(jsonReturnData);
    } catch (err: unknown) {
      next(err);
    }
  }
}
